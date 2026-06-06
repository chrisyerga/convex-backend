# Notes for local Convex development

Dear diary, for my first open source contribution I've decided on a massive thing that I will never finish. Sleep well.

### Backend Build

There seem to be many ways to build the backend:

1. ```just run-local-backend``` is the default way to get stuff going
   * It's a wrapper around ```cargo run``` that passes in args to set up a dev backend called _carnitas_ with some hard-coded keys that you can find in crates/keybroker/dev/
2. Therefore ```cargo build``` works to just to the build step
3. They also use https://rushjs.io for some stuff which is a monorepo build tool. Invoke with ```just rush```

```just reset-local-backend``` to clean the build

### Dashboard Build

Hmm...so I can point it at my normal deployment, which is cool. But what's my DEPLOYMENT_URL for a local backend?

```
just run-dashboard "YOUR_DEPLOYMENT_URL"
```

So you can point a locally-developed dashboard at a real Convex deployment on their cloud
Or point it to a local backend with DEPLOYMENT_URL=http://localhost:3210/
admin key=0135d8598650f8f5cb0f30c34ec2e2bb62793bc28717c8eb6fb577996d50be5f4281b59181095065c5d0f86a2c31ddbe9b597ec62b47ded69782cd

Launch deshboard: http://localhost:6790

## Dev env & ports

* 3210: the convex backend port
* 3211: config.site_proxy_port in creates/local_backend/src/main.rs::main()
* 6790: local dashboard app

Mythological:
A lot of this from crates/backend_harness sniffing around
* 8001: I think this is the rpc port for backend functions
* 8002: Something called Usher? 
* 8050: "big brain" backends 
* 8000/7999: backend/rpc ports for hosted maybe?


# How backend functions get called

Most stuff goes through here:

    /// Execute a public query on the root app. This method is used by the sync
    /// worker and HTTP API for the majority of traffic as the main entry point
    /// for queries.
    async fn execute_public_query(
        &self,
        host: &ResolvedHostname,
        request_context: RequestContext,
        identity: Identity,
        path: ExportPath,
        args: SerializedArgs,
        caller: FunctionCaller,
        ts: ExecuteQueryTimestamp,
        journal: Option<SerializedQueryJournal>,
    ) -> anyhow::Result<RedactedQueryReturn>;

# Stepping the code

**LLDB** right now it's stepping object code with symbols, but has no knowledge of Rust
The Debug Console gives you the LLDB command line. In there you can enter "language" but it only knows "cplusplus" and "objc"
See about plugins or other?

Set up launch.json for lldb that attaches to "cargo run -p local_backend ..etc" from just run-local-backend
- Works, but kinda ugly. It starts multiple shells, gets errors etc. 
- Maybe pull the Cargo build bit out and just run the bin?

Found entrypoint at crates/local_backed/src/main.rs::main()
- Stepping this. Loads config. looks good so far!
- sets up tracing and does their "Hello Cleveland"
- initialize Tokio and Convex runtime
  - Tokio - multithread async network lib. async/await shit
  - Runtime just sits on port 3210 looks like
- Calls server main and waits
  - run_server() calls select
- Eventually goes through gobbledygook and gets to run_server_inner()
  - not there yet...lol
- make_app() starts shit up
  - Instantiates a key_broker()
    - Inside crates/local_backend/src/config.rs -- lots of interesting stuff in here for config like:
      - Config interface has db driver, deployment URL, etc.
      - db_spec / driver: defaults to SQLlite3
      - interface/port: to bind to
        - port 3210 "daemon"
        - port 3211 "Convex HTTP Actions"
        - convex_origin: convex server (localhost:3210 or brave-nipples.xxx.etc)
        - convex_site: http actions (AHA. Site url is for actions)
        - instance_name / instance_secret
        - local_storage: dir for local storage (convex_local_storage)
        - s3_storage: bool to use
        - do_not_require_ssl: for DB connections
        - beacon stuff
        - local_log_sink: fs logs / datadog
  - Sets up searcher / in_process_searcher for search indexing (crates/search)
  - Instantiates DB
    - Has a quota/rate limiter thingy
    - initialize_application_system_tables() _db, _auth, _functions, _scheduled_jobs, _modules, _tables, _indexes, etc
    - All this in convex_local_data.sqlite3 presumably?
  - Instantiate File Storage
    - convex_local_storage/files, /modules, /search, etc.
  - Instantiates DeploymentMetadata
    - name / region
    - deploymentclass (paid/premium presumably?)
  - End of this creates Application<ProdRuntime> which is seeded with all the crap it made above, including next stuff:
    - node_process_timeout(5 seconds) -- this a global thing or just for the next call?
    - node_executor(takes timeout thing)
    - creates Actions(takes node exec/timeout) -- this the thing that actually runs stuff?
    - creates fetch_client, oidc_http_client
    - function_runner
      - OK. This is one of the biggies!
      - This instantiates **isolate** their V8 sandbox runner / cloud worker stuff
      - [IsolateCLient::new()](https://github.com/chrisyerga/convex-backend/blob/9c73f185d0f698eaefce0ee82af6f245674bc6d1/crates/isolate/src/client.rs#L550)
        - [initialize_v8()](https://github.com/chrisyerga/convex-backend/blob/9c73f185d0f698eaefce0ee82af6f245674bc6d1/crates/isolate/src/client.rs#L463)
          - sets up some unicode bullshit
          - v8::new_unprotected_default_platform()
            - config: thread pool size, idle fns behavior, etc.
            - Looks like this stuff is from https://github.com/denoland/rusty_v8
          - Passes command-line flags to v8
            - --no-wasm-async-compilation (due to WASM crash...lots of these bugs are now fixed)
            - --disallow-code-generation-from-strings (no eval() etc.)
            - --stack-size=2048
            - --js-base-64 (Hmmm....used for inspector URLs. Someeone already tried?)
      - (back to IsolateClient now)
        - creates a scheduler and workers
      - crates/isolate/client.rs also has interesting stuff:
        - [execute_udf()](https://github.com/chrisyerga/convex-backend/blob/9c73f185d0f698eaefce0ee82af6f245674bc6d1/crates/isolate/src/client.rs#L631)
        - execute_action()
        - execute_http_action()
           ```
            /// HTTP actions can run other UDFs, so they take in a ActionCallbacks from
            /// the application layer. This creates a transient reference cycle.
            ```
      - (back to inner function_runner())
        - creates index_cache, module_cache and code_cache
        - done with instantiation
      - in-process function_runner assigns this to a var named "server" so I guess this is the main doohicky
  - Now we instantiate Application with all the doodads (db, filestore, function_runner, search/indexer)
- We're back at the outer select of run_server ready to accept requests

Looks like maybe 4 Applications/Servers are created? Or maybe just async stuff hitting those breakpoints a lot

**GOAL** is to figure out where to plug in ```deno_core::v8::inspector``` (a Rusty implementation of the Javascript inspector). 
Likely candidates are somewhere that hooks into function_runner or thereabouts. function_runner creates the v8 engine so it feels right

## Execution types

There are two things that execute Javascript code:

**Actions<Runtime>** This is the "node" execution environment that's available if you ask for it for certain functions.
Takes a NodeExecutor, deployment data, but not much else. I bet this is the first implementation and the function_runner is
the new streamlined cloud worker thingamajig.

```Rust
        pub trait FunctionRunner<RT: Runtime>: Send + Sync + 'static {
            async fn run_function(
                &self,
                udf_type: UdfType,
                identity: Identity,
                ts: RepeatableTimestamp,
                existing_writes: FunctionWrites,
                log_line_sender: Option<mpsc::UnboundedSender<LogLine>>,
                function_metadata: Option<FunctionMetadata>,
                http_action_metadata: Option<HttpActionMetadata>,
                default_system_env_vars: BTreeMap<EnvVarName, EnvVarValue>,
                in_memory_index_last_modified: BTreeMap<IndexId, Timestamp>,
                context: ExecutionContext,
            ) -> anyhow::Result<(
                Option<FunctionFinalTransaction>,
                FunctionOutcome,
                FunctionUsageStats,
            )>;
```

**function_runner<Runtime>** This is the main cloud-woker sandbox method
[lib.rs](https://github.com/chrisyerga/convex-backend/blob/9c73f185d0f698eaefce0ee82af6f245674bc6d1/crates/function_runner/src/lib.rs#L84)
Lots of interesting-looking methods inside: evaluate(), evaluate_schema(), evaluate_app_definitions() etc. 
Same create has stuff like InProcessFunctionRunner<RT>

function_runner creates a new IsolateClient. Not sure if Actions does the same

Analyze() runs in an AnalyzeEnvironment. The runner sends a oneshot request to itself (scheduler?) 
code in crates/isolate/analyze - looks like it finds queries, mutations, UDFs, HTTP action routes, and crons

```Rust
    let function_runner: Arc<dyn FunctionRunner<ProdRuntime>> =
        Arc::new(InProcessFunctionRunner::new(
            deployment,
            key_broker.function_runner_keybroker(),
            config.convex_origin_url()?,
            runtime.clone(),
            persistence.reader(),
            DeploymentStorage {
                files_storage: application_storage.files_storage.clone(),
                modules_storage: application_storage.modules_storage.clone(),
            },
            database.clone(),
            fetch_client.clone(),
        )?);
```

**Random Breakpoints**

At this point we've stepped through all the setup of the Action and function_runner envs. The rest is highly async stuff so 
need to get a higher-level debugger set up and maybe instrument the UDF runner etc.

pub async fn execute_udf(
