[![Any ISL version after v0.1.0-alpha supported](https://img.shields.io/badge/ISL-after_v0.1.0--alpha-00e3ff "Any ISL version after v0.1.0-alpha supported")](https://github.com/LightningLaser8/ISL)
# MultISL
MultISL is an ISL extension that allows ISL programs to utilise multiple disposable interpreters ("threads"), each one running entirely separately.  
Each interpreter has the same options as the original interpreter, and run asynchronously.  
*Note: Does not actually run in separate system threads, but in async loops.*
## Keywords: `thread`
There's only one keyword added by this extension: `thread`  
It performs all available operations on threads.  
### Syntax
```isl
<label> thread <thread> [...code]
```
Performs an operation determined by the label on the specified thread.
### Labels
`create`: Makes a new thread.  
`delete`: Removes an existing thread.  
`add-to`: Adds some ISL to the thread's interpreter.  
`in`: Executes some ISL in the thread's interpreter directly.  
`start`: Starts the thread's interpreter's execution loop.  
`stop`: Stops the thread's interpreter's execution loop.  
`pause`: Pauses the thread's interpreter's execution loop. It can be resumed with `start thread <thread>`. Not the same as the keyword `pause`.  