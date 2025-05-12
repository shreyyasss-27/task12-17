# 🧮 CalculatorSelenium – Selenium Testing of a Simple JavaScript Calculator

This project demonstrates how to test a basic HTML+JavaScript calculator using **Selenium WebDriver** with **Node.js** and **ChromeDriver**. The calculator performs basic arithmetic operations (add, subtract, multiply, divide), and the automated test verifies its functionality using browser automation.

---

## 📁 Project Folder Setup

### 1. Create the Project Directory

Open a terminal or command prompt and run:

```bash
mkdir CalculatorSelenium
cd CalculatorSelenium
```

---

## ⚙️ Initialize Node.js Project

Initialize the project with default settings:

```bash
npm init -y
```

This creates a `package.json` file.

---

## 📦 Install Dependencies

Install Selenium WebDriver and ChromeDriver:

```bash
npm install selenium-webdriver chromedriver
```

This adds the `node_modules/` folder and `package-lock.json`.

---

## 📝 Create Calculator UI

Create a file named `index.html` and paste the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
        }
        input, button {
            margin: 5px;
            padding: 5px;
        }
        #result {
            margin-top: 20px;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <h1>Simple Calculator</h1>
    <input type="number" id="num1" placeholder="Enter first number">
    <input type="number" id="num2" placeholder="Enter second number"><br>
    <button onclick="calculate('add')">Add</button>
    <button onclick="calculate('subtract')">Subtract</button>
    <button onclick="calculate('multiply')">Multiply</button>
    <button onclick="calculate('divide')">Divide</button>
    <div id="result"></div>
    <script>
        function calculate(operation) {
            const num1 = parseFloat(document.getElementById('num1').value);
            const num2 = parseFloat(document.getElementById('num2').value);
            let result;
            if (isNaN(num1) || isNaN(num2)) {
                document.getElementById('result').textContent = 'Please enter valid numbers';
                return;
            }
            switch (operation) {
                case 'add':
                    result = num1 + num2;
                    break;
                case 'subtract':
                    result = num1 - num2;
                    break;
                case 'multiply':
                    result = num1 * num2;
                    break;
                case 'divide':
                    if (num2 === 0) {
                        document.getElementById('result').textContent = 'Cannot divide by zero';
                        return;
                    }
                    result = num1 / num2;
                    break;
            }
            document.getElementById('result').textContent = `Result: ${result}`;
        }
    </script>
</body>
</html>
```

---

## 🧪 Create Selenium Test Script

Create a file named `test.js` and add the following code:

```javascript
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('chromedriver');
const path = require('path');

async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        const filePath = 'file:///' + path.join(__dirname, 'index.html').replace(/\\/g, '/');
        await driver.get(filePath);
        await driver.findElement(By.id('num1')).sendKeys('10');
        await driver.findElement(By.id('num2')).sendKeys('5');
        await driver.findElement(By.cssSelector('button[onclick="calculate(\'add\')]')).click();
        await driver.wait(until.elementLocated(By.id('result')), 5000);
        const result = await driver.findElement(By.id('result')).getText();
        if (result === 'Result: 15') {
            console.log('✅ Test passed: Addition is correct');
        } else {
            console.log(`❌ Test failed: Expected "Result: 15", but got "${result}"`);
        }
        await driver.sleep(10000);
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await driver.quit();
    }
}

runTest();
```

---

## ✅ Verify Setup

1. **Check Node.js Installation:**

```bash
node -v
npm -v
```

Expected output:

```bash
v22.13.1
10.9.2
```

2. **Ensure Google Chrome is installed.**

   * Go to Chrome → Settings → **About Chrome** → Note your version (e.g., `135.0.7049.85`).

   The installed `chromedriver` package should automatically match your Chrome version.

---

## 🚀 Run the Selenium Test

From the `CalculatorSelenium` folder, run:

```bash
node test.js
```

### Expected Output:

* Chrome opens the `index.html` calculator.
* Inputs `10` and `5`.
* Clicks the **Add** button.
* Displays: **Result: 15**
* Test logs in terminal:

  ```
  ✅ Test passed: Addition is correct
  ```

---

## 📁 Folder Structure

```text
CalculatorSelenium/
├── node_modules/            # Auto-generated Node.js dependencies
├── index.html               # Simple calculator UI
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Dependency lock file
└── test.js                  # Selenium test script
```

---

## 📘 Explanation of Key Files

| File/Folders        | Purpose                                                                         |
| ------------------- | ------------------------------------------------------------------------------- |
| `index.html`        | The core calculator with buttons and logic for operations.                      |
| `test.js`           | Automates browser testing for addition using Selenium WebDriver.                |
| `package.json`      | Lists project metadata and dependencies (`selenium-webdriver`, `chromedriver`). |
| `package-lock.json` | Locks exact dependency versions. No need to edit.                               |
| `node_modules/`     | Contains installed libraries. Ignore in version control.                        |

---

## 🧠 Notes

* Ensure **ChromeDriver** matches your Chrome version.
* Tests are written for **Addition**. You can extend `test.js` to test **Subtract**, **Multiply**, or **Divide** as well.
* Run `npm install` again on new machines to restore dependencies.
