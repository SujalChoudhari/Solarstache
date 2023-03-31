import * as fs from "fs";
/**
 * Solarstache
 * -----
 * A simple and fast Template Engine for JavaScript.
 * User can choose their own delimiters, by default it uses << and >> for javascript and <<= and >> for variables.
 * 
 * @remarks
 * Name solarstache is inspired from mustache and solaris.
 * 
 * The code of the Solarstache is inspired from the [article](https://medium.com/wdstack/understanding-javascript-micro-templating-f37a37b3b40e).
 * @author Sujal Choudhari <sjlchoudhari@gmail.com>
 */
export default class Solarstache {
    /**
     * Variable Delimiter - Default: ["<<=", ">>"]
     */
    public static variableDelimiter: [string, string] = ["<<=", ">>"];

    /**
     * Javascript Delimiter - Default: ["<<", ">>"]
     */
    public static javascriptDelimiter: [string, string] = ["<<", ">>"];

    private static mVariableRegex: RegExp = new RegExp(`${Solarstache.variableDelimiter[0]}(.+?)${Solarstache.variableDelimiter[1]}`, "g");
    private static mJavascriptRegex: RegExp = new RegExp(`${Solarstache.javascriptDelimiter[0]}(.+?)${Solarstache.javascriptDelimiter[1]}`, "g");

    private static mCache: { [key: string]: Function } = {};

    public set variableDelimiter(value: [string, string]) {
        Solarstache.variableDelimiter = value;
        Solarstache.mVariableRegex = new RegExp(`${Solarstache.variableDelimiter[0]}(.+?)${Solarstache.variableDelimiter[1]}`, "g");
        Solarstache.clearCache();
    }

    public set javascriptDelimiter(value: [string, string]) {
        Solarstache.javascriptDelimiter = value;
        Solarstache.mJavascriptRegex = new RegExp(`${Solarstache.javascriptDelimiter[0]}(.+?)${Solarstache.javascriptDelimiter[1]}`, "g");
        Solarstache.clearCache();
    }

    private static templater(template: string): Function {
        const code =
            "var output=" +
            JSON.stringify(template)
                .replace(Solarstache.mVariableRegex, '"+($1)+"')
                .replace(Solarstache.mJavascriptRegex, '";$1 output+="')
                .replace(/(\r\n|\n|\r)/gm, "\\n") +
            ";return output;";
        return new Function("props", code);
    }

    /**
     * Parse the template and return a function to be used for rendering.
     * @param template The string template to be parsed.
     * @returns new Function to be used for rendering.
     * @remarks
     * This will parse the template and return a function to be used for rendering.
     * This will be called automatically when the template is rendered.
     * This is not required to be called manually.
     * The parsed template will be cached for future use.
     * The cache will be cleared when the delimiters are changed.
     * @example
     * ```typescript
     * const template = "Hello, <<name>>";
     * const render = Solarstache.parse(template);
     * const props = { name: "Sujal" };
     * const rendered = render(props);
     * console.log(rendered); // Hello, Sujal
     */
    public static parse(template: string): Function {
        if (!Solarstache.mCache[template]) {
            Solarstache.mCache[template] = Solarstache.templater(template);
        }
        return Solarstache.mCache[template];
    }

    /**
     * Render the template with the given props.
     * @param template The string template to be rendered.
     * @param props The props to be used for rendering.
     * @returns The rendered string.
     * @remarks
     * If the template is not parsed before, it will be parsed first.
     * If the template is already parsed, it will be used for rendering.
     * @example
     * ```typescript
     * const template = "Hello, <<name>>";
     * const props = { name: "Sujal" };
     * const rendered = Solarstache.render(template, props);
     * console.log(rendered); // Hello, Sujal
     * ```
     */
    public static render(template: string, props: { [key: string]: any }): string {
        if (Solarstache.mCache[template]) {
            return Solarstache.mCache[template](props);
        }
        Solarstache.parse(template);
        return Solarstache.mCache[template](props);
    }

    /**
     * Clear the cache.
     * @remarks
     * This will clear the cache of all the parsed templates.
     * This will be called automatically when the delimiters are changed.
     * This is not required to be called manually.
     * @example
     * ```typescript
     * Solarstache.clearCache();
     * ```
     */
    public static clearCache() {
        Solarstache.mCache = {};
    }


}
