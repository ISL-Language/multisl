import { ISLInterpreter, ISLError } from "https://cdn.jsdelivr.net/gh/LightningLaser8/ISL@main/core/interpreter.js";
import { ISLExtension } from "https://cdn.jsdelivr.net/gh/LightningLaser8/ISL@main/core/extensions.js";
class MultISLExtension extends ISLExtension {
  threads = {};
  options = {};
  constructor(interpreter) {
    super("multisl");

    this.options = interpreter.options;

    this.addLabel("create", ["thread"]);
    this.addLabel("addto", ["thread"]);
    this.addLabel("in", ["thread"]);
    this.addLabel("start", ["thread"]);
    this.addLabel("stop", ["thread"]);
    this.addLabel("pause", ["thread"]);
    this.addLabel("delete", ["thread"]);

    this.addKeyword(
      "thread",
      function (interpreter, labels, threadName, ...isl) {
        if (labels.length !== 1) {
          throw new ISLError(
            "Cannot perform multiple thread operations at once, please only use one label at a time.", SyntaxError
          );
        }
        if (labels.includes("create")) {
          this.threads[threadName] = {
            name: threadName,
            isl: [],
            interpreter: new ISLInterpreter(this.getThreadOpts(threadName)),
          };
        } else {
          if (!this.threads[threadName]) {
            throw new ISLError(
              "Cannot " +
                labels[0] +
                " a nonexistent thread '" +
                threadName +
                "'", ReferenceError
            );
          }
        }
        if (labels.includes("addto")) {
          this.threads[threadName].isl.push(
            isl.map((x) => '"' + x + '"').join(" ")
          );
        }
        if (labels.includes("in")) {
          this.threads[threadName].interpreter.executeLine(
            isl.map((x) => '"' + x + '"').join(" ")
          );
        }
        if (labels.includes("start")) {
          this.threads[threadName].interpreter.loadISL(
            this.threads[threadName].isl
          );
          this.threads[threadName].interpreter.startExecution();
        }
        if (labels.includes("stop")) {
          this.threads[threadName].interpreter.stopExecution();
        }
        if (labels.includes("pause")) {
          this.threads[threadName].interpreter.pauseExecution();
        }
        if (labels.includes("delete")) {
          this.threads[threadName].interpreter.stopExecution();
          delete this.threads[threadName];
        }
      }
    );
  }
  getThreadOpts(threadName) {
    let options = structuredClone(this.options);
    options.name = this.options.name + " (thread '" + threadName + "')";
    return options;
  }
}

export default MultISLExtension;
