const inquirer = require("inquirer").default;

async function start() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the issue title?",
      validate: (input) => {
        if (!input.trim()) return "Title cannot be empty";
        return true;
      }
    },
    {
      type: "input",
      name: "description",
      message: "Describe the issue in detail:",
      validate: (input) => {
        if (!input.trim()) return "Description cannot be empty";
        if (input.length < 10) return "Please give a bit more detail (min 10 chars)";
        return true;
      }
    },
    {
      type: "list",
      name: "severity",
      message: "How severe is it?",
      choices: ["low", "medium", "high"]
    }
  ]);

  printTicket(answers);
}

function printTicket(ticket) {
  console.log("\n==============================");
  console.log("      SUPPORT TICKET");
  console.log("==============================\n");

  console.log(`Title      : ${ticket.title}`);
  console.log(`Description: ${ticket.description}`);
  console.log(`Severity   : ${ticket.severity.toUpperCase()}`);

  console.log("\n==============================");
  console.log("Status: RECEIVED ✔️");
  console.log("==============================\n");
}

start();