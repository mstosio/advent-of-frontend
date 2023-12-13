const availableFormats = {
    b64: 'b64',
    c13: 'c13',
    uri: 'uri'
}

// I'm not sure what "c13" means or how to interpret it. Since it's unclear, I've come up with my own explanation :P
function customDecoder(encodedString: string){
    const letterMap: Record<string, string> = {
        o: "b",
        v: "i",
        p: "c",
        l: "y",
        i: "v",
        "y": "l",
        r: "e",
        e: "r"
    }

    return encodedString
        .split('')
        .map(currentChar => letterMap[currentChar] || currentChar)
        .join('');
}

function decodeValues(values: Record<string, string>): Record<string, string>{
    const decoded: Record<string, string> = {}

    for(let [key, value] of Object.entries(values)){
        const [encoding, encodedVal] = value.split(":")

        if(encoding.includes(availableFormats.uri)){
            decoded[key] = decodeURIComponent(encodedVal)
            continue
        }

        if(encoding.includes(availableFormats.b64)){
            decoded[key] = Buffer.from(encodedVal, 'base64').toString('utf-8')
            continue
        }

        if(encoding.includes(availableFormats.c13)){
            decoded[key] = customDecoder( encodedVal)
            continue
        }

        decoded[key] = ""
    }

    return decoded
}

function findAvailableKeys(template: string){
    return template.match(/\{\{(.*?)\}\}/g)?.map(match => match.replace(/^\{\{|\}\}$/g, '').trim());
}

function splitTemplate(template: string){
    return  template.split(/\{\{(.*?)\}\}/);
}

function generateString({
                           availableKeys,  decodedValues, templateChunks,availableValues,
                      }: { decodedValues: Record<string, string>, templateChunks: string[], availableKeys: string[] | undefined, availableValues: string[] } ){
    return templateChunks.map(item => {
        const templateValue = item.trim()

        if(Object.keys(decodedValues).includes(templateValue)){
            return decodedValues[templateValue]
        }

        if(availableKeys?.includes(templateValue) && !availableValues.includes(templateValue)){
            return ""
        }

        return item
    }).join("")
}
export function decodeMessage(template: string, values: Record<string, string>): string {
    const decodedValues = decodeValues(values)
    const availableKeys = findAvailableKeys(template)
    const availableValues = Object.keys(values)
    const templateChunks = splitTemplate(template)

    return generateString({
        decodedValues,
        availableKeys,
        availableValues,
        templateChunks
    })
}