# Function runner

**function_runner** is the main cloud-worker sandbox method.

Source: <CrateRef crate="function_runner" file="lib.rs" path="crates/function_runner/src/lib.rs" line="84" />

Lots of interesting-looking methods inside: `evaluate()`, `evaluate_schema()`, `evaluate_app_definitions()`, etc. Same crate has `InProcessFunctionRunner<RT>`.

## Instantiation in make_app

```rust
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

## The trait

```rust
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
}
```

## What it creates

During `InProcessFunctionRunner::new()`:

1. Instantiates **isolate** — their V8 sandbox runner / cloud worker stuff
2. Creates `index_cache`, `module_cache`, and `code_cache`
3. In-process function_runner assigns this to a var named `"server"` — the main doohicky

function_runner creates a new `IsolateClient`. Not sure if `Actions` does the same.

## Analyze

`Analyze()` runs in an `AnalyzeEnvironment`. The runner sends a oneshot request to itself (scheduler?).

Code in <CrateRef crate="isolate" file="analyze.rs" path="crates/isolate/src/environment/analyze.rs" /> — looks like it finds queries, mutations, UDFs, HTTP action routes, and crons.

## Related

- [Isolate client](/execution/isolate-client)
- [Actions vs runner](/execution/actions-vs-runner)
- [UDF execution flow](/flows/udf-execution)
