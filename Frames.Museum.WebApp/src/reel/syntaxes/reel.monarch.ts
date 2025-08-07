// Monarch syntax highlighting for the reel language.
export default {
    keywords: [
        'Connect','InPort','Infinity','OutPort','Ports','TimeUnits','and','any','atomic','atomic2','becomes','bool','coupled','export','false','first','from','import','initial','int','model','name','object','or','output','section','state','stateDefinition','states','string','this','time-advance','to','transitions','true','with'
    ],
    operators: [
        '!=','*','+','-','.','/',':',';','<','<=','=','==','=>','>','>=','|'
    ],
    symbols: /!=|\(|\)|\*|\+|-|\.|\/|:|;|<|<=|=|==|=>|>|>=|\[|\]|\{|\||\}/,

    tokenizer: {
        initial: [
            { regex: /[_a-zA-Z][\w_]*/, action: { cases: { '@keywords': {"token":"keyword"}, '@default': {"token":"ID"} }} },
            { regex: /[0-9]+/, action: { cases: { '@keywords': {"token":"keyword"}, '@default': {"token":"number"} }} },
            { regex: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/, action: {"token":"string"} },
            { include: '@whitespace' },
            { regex: /@symbols/, action: { cases: { '@operators': {"token":"operator"}, '@default': {"token":""} }} },
        ],
        whitespace: [
            { regex: /\s+/, action: {"token":"white"} },
            { regex: /\/\*/, action: {"token":"comment","next":"@comment"} },
            { regex: /\/\/[^\n\r]*/, action: {"token":"comment"} },
        ],
        comment: [
            { regex: /[^/\*]+/, action: {"token":"comment"} },
            { regex: /\*\//, action: {"token":"comment","next":"@pop"} },
            { regex: /[/\*]/, action: {"token":"comment"} },
        ],
    }
};
