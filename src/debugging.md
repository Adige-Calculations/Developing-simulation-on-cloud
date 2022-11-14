# Deugging in VS code

Install the extention ```CodeLLDB``` from Vadim Chugunov which is a native debugger powered by LLDB.
Then create a launcg configuration file in the  root of your directory as follows:
```sh
.vscode/
└── launch.json
```
Inside ```launch.json``` give the instructions to permit at the debugger to understand what you are debugging. The following example shows
a WSL environment that will debug a package named ```thermal_domain_resolution```.

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "lldb",
            "request": "launch",
            "name": "Debug executable 'thermal_domain_resolution'",
            "cargo": {
                "args": [
                    "build",
                    "--bin=thermal_domain_resolution",
                    "--package=thermal_domain_resolution"
                ],
                "filter": {
                    "name": "thermal_domain_resolution",
                    "kind": "bin"
                }
            },
            "args": [],
            "cwd": "${workspaceFolder}"
        },
        {
            "type": "lldb",
            "request": "launch",
            "name": "Debug unit tests in executable 'thermal_domain_resolution'",
            "cargo": {
                "args": [
                    "test",
                    "--no-run",
                    "--bin=thermal_domain_resolution",
                    "--package=thermal_domain_resolution"
                ],
                "filter": {
                    "name": "thermal_domain_resolution",
                    "kind": "bin"
                }
            },
            "args": [],
            "cwd": "${workspaceFolder}"
        }
    ]
}
```
## Debug function content 

Once the debugging has started, the debug session will show the ```breakpoints``` section, 
the default breakpoint is ```Rust on panic```. If you want to debug a specific funciton 
you can introduce as a breakpoint the function name so you can start to debug the function.