
/**
 * Solarstache
 * -----
 * A simple and fast Template Engine for JavaScript.
 * User can choose their own delimiters, by default it uses <% and %> for javascript and <%= and %> for variables.
 * 
 * @remarks
 * Name solarstache is inspired from mustache and solaris.
 * 
 * The code of the Solarstache is inspired from the [article](https://medium.com/wdstack/understanding-javascript-micro-templating-f37a37b3b40e).
 * 
 */
export default class Solarstache {

    public static variableDelimiter: [string, string] = ["<%=", "%>"];
    public static javascriptDelimiter: [string, string] = ["<%", "%>"];

    private static mVariableRegex: RegExp = new RegExp(`${Solarstache.variableDelimiter[0]}(.+?)${Solarstache.variableDelimiter[1]}`, "g");
    private static mJavascriptRegex: RegExp = new RegExp(`${Solarstache.javascriptDelimiter[0]}(.+?)${Solarstache.javascriptDelimiter[1]}`, "g");

    private static mCache: { [key: string]: Function } = {};

    public static updateDelimiters(variableDelimiter: [string, string], javascriptDelimiter: [string, string]) {
        Solarstache.variableDelimiter = variableDelimiter;
        Solarstache.javascriptDelimiter = javascriptDelimiter;
        Solarstache.mVariableRegex = new RegExp(`${Solarstache.variableDelimiter[0]}(.+?)${Solarstache.variableDelimiter[1]}`, "g");
        Solarstache.mJavascriptRegex = new RegExp(`${Solarstache.javascriptDelimiter[0]}(.+?)${Solarstache.javascriptDelimiter[1]}`, "g");
    }

    private static templater(template: string): Function {
        return new Function(
            "page",
            "var output=" +
            JSON.stringify(template)
                .replace(Solarstache.mVariableRegex, '"+($1)+"')
                .replace(Solarstache.mJavascriptRegex, '";$1\noutput+="') +
            ";return output;"
        );
    }

    public static parse(template: string) {
        if (!Solarstache.mCache[template]) {
            Solarstache.mCache[template] = Solarstache.templater(template);
        }
    }

    public static render(template: string, data: any): string {
        if (Solarstache.mCache[template]) {
            return Solarstache.mCache[template](data);
        }
        Solarstache.parse(template);
        return Solarstache.mCache[template](data);
    }

    public static clearCache() {
        Solarstache.mCache = {};
    }
}
