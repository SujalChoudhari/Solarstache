Solarstache
===========
Solarstache is a zero dependency Templating engine for Typescript.
Ti is a logic-based, meaning that it is not based on a template language like Handlebars or Mustache.
But it is based on a logic language like Javascript. YOu can write javascript code to impliment logic.

Because of direct js code, the processing is faster than other template engines.

The code of the Solarstache is inspired from the [article](https://medium.com/wdstack/understanding-javascript-micro-templating-f37a37b3b40e).
## Where can I use it?
Solarstache is a minimalistic template engine. 
It is not a full-fledged framework. 
It is a tool that can be used in any framework or library.

When you need some templating functionality, but dont want to use an entire templating framework with large code base, 
Solarstache is the right choice.

## Installation
Download the [Repository](https://github.com/SujalChoudhari/Solarstache.git)

OR

Copy the `index.js` file from the `dist` folder. (for javascript)
Copy the `index.ts` file from the `src` folder. (for typescript)

OR

Install it using npm
```bash
npm i @sujalchoudhari/solarstache
```

OR 
Install it using yarn
```bash
yarn add @sujalchoudhari/solarstache
```

## Usage
```ts
import { Solarstache } from 'path/to/solarstache';

const view = {
  title: "Sujal",
  calc: "$100"
};

const output = Solarstache.render("<<=title>> spends <<calc>>", view);
```

In this example, the `view` object is passed to the `render` function.
The `view` object is used to replace the variables in the template.

## Syntax
The syntax of Solarstache is very simple.
It is mix of Mustache and Html.
For accessing the variables, you can use `<<= varname>>`
For running javascript code, you can use `<< code >>`

Thats it. Thats the whole syntax.

## Example
```ts
const template = `
    <h1><<= title >></h1>
    <p><<= calc >></p>
    <p>
        << for(let i = 1; i <= 10; i++) { >> 
            <<= i >> Sheep
        << } >>
    </p>
`;

const view = {
    title: "Sujal",
    calc: "$100"
};

const html = Solarstache.render(template, view);
```
Output:
```html
<h1>Sujal</h1>
<p>$100</p>
<p>
    1 Sheep
    2 Sheep
    3 Sheep
    4 Sheep
    5 Sheep
    6 Sheep
    7 Sheep
    8 Sheep
    9 Sheep
    10 Sheep
</p>

<!-- Note: The output is not formatted that well. It is just for demonstration. -->
```

## Custom Delimiters
You can change the delimiters to anything you want.
```ts
Solarstache.variableDelimiter = ["{{", "}}"];
Solarstache.javascriptDelimiter = ["{%", "%}"];
```


## Caching
Solaris by default caches the templates.
You can manually cache the templates by using the `parse` function.
```ts
const template = Solarstache.parse("<<= title >>");
``` 
`parse` returns a function to render with props, also caches the template.
This cached template can be used to render multiple times.
```ts
Solarstache.parse("<<= title >>"); // Caches the template

const output1 = Solarstache.render("<<= title >>", { title: "Sujal" }); // Uses the cached template
const output2 = Solarstache.render("<<= title >>", { title: "Choudhari" }); // Uses the cached template
// Improves performance

```

All the caches are cleared when the `clearCache` function is called.
```ts
Solarstache.clearCache();
```
Also when different delimiters are used, the cache is cleared.

### Happy Coding!
