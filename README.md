


# Solarstache

Solarstache is a zero-dependency templating engine for TypeScript. It's a logic-based engine that's not based on a template language like Handlebars or Mustache, but rather on a logic language like JavaScript. With Solarstache, you can write JavaScript code to implement logic, making it a perfect choice for developers who prefer direct code implementation.

Because of the direct JavaScript code implementation, processing with Solarstache is faster than other template engines. (Yeah, that's right, it's faster than a rocket-powered cheetah!)

The code for Solarstache was inspired by an article that was written on a sunny day by a programmer with a great mustache. (That's right, we take mustaches very seriously around here!)

## Where can I use it?

Solarstache is a minimalistic template engine, which means it's not a full-fledged framework. It's a tool that can be used in any framework or library. Whether you're building an app in React, Angular, Vue, or any other framework, Solarstache can be easily integrated with your existing codebase.

When you need some templating functionality but don't want to use an entire templating framework with a large code base (we all have been there, right?), Solarstache is the right choice. It's like a Swiss Army knife for your templating needs, compact and efficient.

So, why settle for less when you can have Solarstache in your toolkit? Try it out today! (Your mustache will thank you for it!)





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
var {Solarstache} = require("@sujalchoudhari/solarstache");
// OR import { Solarstache } from "@sujalchoudhari/solarstache";


const view = {
  title: "Sujal",
  calc: "$100"
};

const output = Solarstache.render("<<=props.title>> spends <<props.calc>>", view);
```

In this example, the `view` object is passed to the `render` function.
The `view` object is used to replace the variables in the template.

## Syntax
The syntax of Solarstache is very simple.
It is mix of Mustache and Html.
For accessing the variables, you can use `<<= props.varname>>`
For running javascript code, you can use `<< props.code >>`

Thats it. Thats the whole syntax.

## Example
```ts
const template = `
    <h1><<= props.title >></h1>
    <p><<= props.calc >></p>
    <p>
        << for(let i = 1; i <= 10; i++) { >> 
            <<= props.i >> Sheep
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
const template = Solarstache.parse("<<= props.title >>");
``` 
`parse` returns a function to render with props, also caches the template.
This cached template can be used to render multiple times.
```ts
Solarstache.parse("<<= title >>"); // Caches the template

const output1 = Solarstache.render("<<= props.title >>", { title: "Sujal" }); // Uses the cached template
const output2 = Solarstache.render("<<= props.title >>", { title: "Choudhari" }); // Uses the cached template
// Improves performance

```

All the caches are cleared when the `clearCache` function is called.
```ts
Solarstache.clearCache();
```
Also when different delimiters are used, the cache is cleared.

### Happy Coding!
