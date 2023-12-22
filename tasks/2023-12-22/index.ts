export interface TextProcessingPlugin {
    parse: (str: string) => string
}

export class ReplaceCharsPlugin implements TextProcessingPlugin{
    charsMap: Record<string, string>
    constructor(charsMap: Record<string, string>) {
        this.charsMap = charsMap
    }
    parse(string: string){
        return string.split("").map(letter => {
            return letter in this.charsMap ? this.charsMap[letter] : letter
        }).join("")
    }
}

export class MarkdownToHtmlPlugin implements TextProcessingPlugin{
    parse(string: string){
        return string.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }
}

export class RemoveWordsPlugin implements TextProcessingPlugin{
    wordsToBeRemoved: string[]
    constructor(wordsToBeRemoved: string[]) {
        this.wordsToBeRemoved = wordsToBeRemoved
    }

    parse(string: string){
        const modifiedWords = string.split(' ').map((word: string) => {
            for (const chars of this.wordsToBeRemoved) {
                while (word.includes(chars)) {
                    const index = word.indexOf(chars);
                    word = word.slice(0, index) + word.slice(index + chars.length);
                }
            }
            return word;
        });
        return modifiedWords.join(' ').replace(/\s+/g, ' ').trim();
    }
}
export class TextProcessor<T> {
    instances: TextProcessingPlugin[]
    constructor() {
        this.instances = [];
    }

    use(instance: TextProcessingPlugin){
        this.instances.push(instance)
    }

    process(text: string) {
        return this.instances.reduce((processedText: string, instance: TextProcessingPlugin) => instance.parse(processedText), text);
    }
}