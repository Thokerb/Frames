"use strict";(()=>{var fw=Object.create;var sl=Object.defineProperty;var pw=Object.getOwnPropertyDescriptor;var mw=Object.getOwnPropertyNames;var hw=Object.getPrototypeOf,gw=Object.prototype.hasOwnProperty;var yw=(t,e)=>()=>(t&&(e=t(t=0)),e);var $=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),Fn=(t,e)=>{for(var r in e)sl(t,r,{get:e[r],enumerable:!0})},ol=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of mw(e))!gw.call(t,i)&&i!==r&&sl(t,i,{get:()=>e[i],enumerable:!(n=pw(e,i))||n.enumerable});return t},ae=(t,e,r)=>(ol(t,e,"default"),r&&ol(r,e,"default")),Jt=(t,e,r)=>(r=t!=null?fw(hw(t)):{},ol(e||!t||!t.__esModule?sl(r,"default",{value:t,enumerable:!0}):r,t)),pm=t=>ol(sl({},"__esModule",{value:!0}),t);var jd={};Fn(jd,{AnnotatedTextEdit:()=>wn,ChangeAnnotation:()=>Ki,ChangeAnnotationIdentifier:()=>At,CodeAction:()=>Sg,CodeActionContext:()=>Rg,CodeActionKind:()=>Tg,CodeActionTriggerKind:()=>jc,CodeDescription:()=>Jh,CodeLens:()=>bg,Color:()=>Id,ColorInformation:()=>Hh,ColorPresentation:()=>Kh,Command:()=>Vi,CompletionItem:()=>cg,CompletionItemKind:()=>rg,CompletionItemLabelDetails:()=>ag,CompletionItemTag:()=>ig,CompletionList:()=>ug,CreateFile:()=>Qs,DeleteFile:()=>ea,Diagnostic:()=>Mc,DiagnosticRelatedInformation:()=>Dd,DiagnosticSeverity:()=>Xh,DiagnosticTag:()=>Yh,DocumentHighlight:()=>mg,DocumentHighlightKind:()=>pg,DocumentLink:()=>Cg,DocumentSymbol:()=>xg,DocumentUri:()=>Bh,EOL:()=>RF,FoldingRange:()=>zh,FoldingRangeKind:()=>Vh,FormattingOptions:()=>Eg,Hover:()=>lg,InlayHint:()=>Dg,InlayHintKind:()=>Fd,InlayHintLabelPart:()=>qd,InlineCompletionContext:()=>jg,InlineCompletionItem:()=>Mg,InlineCompletionList:()=>Lg,InlineCompletionTriggerKind:()=>Fg,InlineValueContext:()=>Ig,InlineValueEvaluatableExpression:()=>Og,InlineValueText:()=>Pg,InlineValueVariableLookup:()=>Ng,InsertReplaceEdit:()=>og,InsertTextFormat:()=>ng,InsertTextMode:()=>sg,Location:()=>$c,LocationLink:()=>Gh,MarkedString:()=>qc,MarkupContent:()=>ta,MarkupKind:()=>Ld,OptionalVersionedTextDocumentIdentifier:()=>Fc,ParameterInformation:()=>dg,Position:()=>ue,Range:()=>ne,RenameFile:()=>Zs,SelectedCompletionInfo:()=>qg,SelectionRange:()=>_g,SemanticTokenModifiers:()=>kg,SemanticTokenTypes:()=>Ag,SemanticTokens:()=>wg,SignatureInformation:()=>fg,StringValue:()=>$g,SymbolInformation:()=>yg,SymbolKind:()=>hg,SymbolTag:()=>gg,TextDocument:()=>Bg,TextDocumentEdit:()=>Lc,TextDocumentIdentifier:()=>Zh,TextDocumentItem:()=>tg,TextEdit:()=>Cr,URI:()=>Od,VersionedTextDocumentIdentifier:()=>eg,WorkspaceChange:()=>Qh,WorkspaceEdit:()=>$d,WorkspaceFolder:()=>Ug,WorkspaceSymbol:()=>vg,integer:()=>Wh,uinteger:()=>Dc});var Bh,Od,Wh,Dc,ue,ne,$c,Gh,Id,Hh,Kh,Vh,zh,Dd,Xh,Yh,Jh,Mc,Vi,Cr,Ki,At,wn,Lc,Qs,Zs,ea,$d,Js,Md,Qh,Zh,eg,Fc,tg,Ld,ta,rg,ng,ig,og,sg,ag,cg,ug,qc,lg,dg,fg,pg,mg,hg,gg,yg,vg,xg,Tg,jc,Rg,Sg,bg,Eg,Cg,_g,Ag,kg,wg,Pg,Ng,Og,Ig,Fd,qd,Dg,$g,Mg,Lg,Fg,qg,jg,Ug,RF,Bg,Wg,x,zi=yw(()=>{"use strict";(function(t){function e(r){return typeof r=="string"}t.is=e})(Bh||(Bh={}));(function(t){function e(r){return typeof r=="string"}t.is=e})(Od||(Od={}));(function(t){t.MIN_VALUE=-2147483648,t.MAX_VALUE=2147483647;function e(r){return typeof r=="number"&&t.MIN_VALUE<=r&&r<=t.MAX_VALUE}t.is=e})(Wh||(Wh={}));(function(t){t.MIN_VALUE=0,t.MAX_VALUE=2147483647;function e(r){return typeof r=="number"&&t.MIN_VALUE<=r&&r<=t.MAX_VALUE}t.is=e})(Dc||(Dc={}));(function(t){function e(n,i){return n===Number.MAX_VALUE&&(n=Dc.MAX_VALUE),i===Number.MAX_VALUE&&(i=Dc.MAX_VALUE),{line:n,character:i}}t.create=e;function r(n){let i=n;return x.objectLiteral(i)&&x.uinteger(i.line)&&x.uinteger(i.character)}t.is=r})(ue||(ue={}));(function(t){function e(n,i,o,s){if(x.uinteger(n)&&x.uinteger(i)&&x.uinteger(o)&&x.uinteger(s))return{start:ue.create(n,i),end:ue.create(o,s)};if(ue.is(n)&&ue.is(i))return{start:n,end:i};throw new Error(`Range#create called with invalid arguments[${n}, ${i}, ${o}, ${s}]`)}t.create=e;function r(n){let i=n;return x.objectLiteral(i)&&ue.is(i.start)&&ue.is(i.end)}t.is=r})(ne||(ne={}));(function(t){function e(n,i){return{uri:n,range:i}}t.create=e;function r(n){let i=n;return x.objectLiteral(i)&&ne.is(i.range)&&(x.string(i.uri)||x.undefined(i.uri))}t.is=r})($c||($c={}));(function(t){function e(n,i,o,s){return{targetUri:n,targetRange:i,targetSelectionRange:o,originSelectionRange:s}}t.create=e;function r(n){let i=n;return x.objectLiteral(i)&&ne.is(i.targetRange)&&x.string(i.targetUri)&&ne.is(i.targetSelectionRange)&&(ne.is(i.originSelectionRange)||x.undefined(i.originSelectionRange))}t.is=r})(Gh||(Gh={}));(function(t){function e(n,i,o,s){return{red:n,green:i,blue:o,alpha:s}}t.create=e;function r(n){let i=n;return x.objectLiteral(i)&&x.numberRange(i.red,0,1)&&x.numberRange(i.green,0,1)&&x.numberRange(i.blue,0,1)&&x.numberRange(i.alpha,0,1)}t.is=r})(Id||(Id={}));(function(t){function e(n,i){return{range:n,color:i}}t.create=e;function r(n){let i=n;return x.objectLiteral(i)&&ne.is(i.range)&&Id.is(i.color)}t.is=r})(Hh||(Hh={}));(function(t){function e(n,i,o){return{label:n,textEdit:i,additionalTextEdits:o}}t.create=e;function r(n){let i=n;return x.objectLiteral(i)&&x.string(i.label)&&(x.undefined(i.textEdit)||Cr.is(i))&&(x.undefined(i.additionalTextEdits)||x.typedArray(i.additionalTextEdits,Cr.is))}t.is=r})(Kh||(Kh={}));(function(t){t.Comment="comment",t.Imports="imports",t.Region="region"})(Vh||(Vh={}));(function(t){function e(n,i,o,s,a,c){let u={startLine:n,endLine:i};return x.defined(o)&&(u.startCharacter=o),x.defined(s)&&(u.endCharacter=s),x.defined(a)&&(u.kind=a),x.defined(c)&&(u.collapsedText=c),u}t.create=e;function r(n){let i=n;return x.objectLiteral(i)&&x.uinteger(i.startLine)&&x.uinteger(i.startLine)&&(x.undefined(i.startCharacter)||x.uinteger(i.startCharacter))&&(x.undefined(i.endCharacter)||x.uinteger(i.endCharacter))&&(x.undefined(i.kind)||x.string(i.kind))}t.is=r})(zh||(zh={}));(function(t){function e(n,i){return{location:n,message:i}}t.create=e;function r(n){let i=n;return x.defined(i)&&$c.is(i.location)&&x.string(i.message)}t.is=r})(Dd||(Dd={}));(function(t){t.Error=1,t.Warning=2,t.Information=3,t.Hint=4})(Xh||(Xh={}));(function(t){t.Unnecessary=1,t.Deprecated=2})(Yh||(Yh={}));(function(t){function e(r){let n=r;return x.objectLiteral(n)&&x.string(n.href)}t.is=e})(Jh||(Jh={}));(function(t){function e(n,i,o,s,a,c){let u={range:n,message:i};return x.defined(o)&&(u.severity=o),x.defined(s)&&(u.code=s),x.defined(a)&&(u.source=a),x.defined(c)&&(u.relatedInformation=c),u}t.create=e;function r(n){var i;let o=n;return x.defined(o)&&ne.is(o.range)&&x.string(o.message)&&(x.number(o.severity)||x.undefined(o.severity))&&(x.integer(o.code)||x.string(o.code)||x.undefined(o.code))&&(x.undefined(o.codeDescription)||x.string((i=o.codeDescription)===null||i===void 0?void 0:i.href))&&(x.string(o.source)||x.undefined(o.source))&&(x.undefined(o.relatedInformation)||x.typedArray(o.relatedInformation,Dd.is))}t.is=r})(Mc||(Mc={}));(function(t){function e(n,i,...o){let s={title:n,command:i};return x.defined(o)&&o.length>0&&(s.arguments=o),s}t.create=e;function r(n){let i=n;return x.defined(i)&&x.string(i.title)&&x.string(i.command)}t.is=r})(Vi||(Vi={}));(function(t){function e(o,s){return{range:o,newText:s}}t.replace=e;function r(o,s){return{range:{start:o,end:o},newText:s}}t.insert=r;function n(o){return{range:o,newText:""}}t.del=n;function i(o){let s=o;return x.objectLiteral(s)&&x.string(s.newText)&&ne.is(s.range)}t.is=i})(Cr||(Cr={}));(function(t){function e(n,i,o){let s={label:n};return i!==void 0&&(s.needsConfirmation=i),o!==void 0&&(s.description=o),s}t.create=e;function r(n){let i=n;return x.objectLiteral(i)&&x.string(i.label)&&(x.boolean(i.needsConfirmation)||i.needsConfirmation===void 0)&&(x.string(i.description)||i.description===void 0)}t.is=r})(Ki||(Ki={}));(function(t){function e(r){let n=r;return x.string(n)}t.is=e})(At||(At={}));(function(t){function e(o,s,a){return{range:o,newText:s,annotationId:a}}t.replace=e;function r(o,s,a){return{range:{start:o,end:o},newText:s,annotationId:a}}t.insert=r;function n(o,s){return{range:o,newText:"",annotationId:s}}t.del=n;function i(o){let s=o;return Cr.is(s)&&(Ki.is(s.annotationId)||At.is(s.annotationId))}t.is=i})(wn||(wn={}));(function(t){function e(n,i){return{textDocument:n,edits:i}}t.create=e;function r(n){let i=n;return x.defined(i)&&Fc.is(i.textDocument)&&Array.isArray(i.edits)}t.is=r})(Lc||(Lc={}));(function(t){function e(n,i,o){let s={kind:"create",uri:n};return i!==void 0&&(i.overwrite!==void 0||i.ignoreIfExists!==void 0)&&(s.options=i),o!==void 0&&(s.annotationId=o),s}t.create=e;function r(n){let i=n;return i&&i.kind==="create"&&x.string(i.uri)&&(i.options===void 0||(i.options.overwrite===void 0||x.boolean(i.options.overwrite))&&(i.options.ignoreIfExists===void 0||x.boolean(i.options.ignoreIfExists)))&&(i.annotationId===void 0||At.is(i.annotationId))}t.is=r})(Qs||(Qs={}));(function(t){function e(n,i,o,s){let a={kind:"rename",oldUri:n,newUri:i};return o!==void 0&&(o.overwrite!==void 0||o.ignoreIfExists!==void 0)&&(a.options=o),s!==void 0&&(a.annotationId=s),a}t.create=e;function r(n){let i=n;return i&&i.kind==="rename"&&x.string(i.oldUri)&&x.string(i.newUri)&&(i.options===void 0||(i.options.overwrite===void 0||x.boolean(i.options.overwrite))&&(i.options.ignoreIfExists===void 0||x.boolean(i.options.ignoreIfExists)))&&(i.annotationId===void 0||At.is(i.annotationId))}t.is=r})(Zs||(Zs={}));(function(t){function e(n,i,o){let s={kind:"delete",uri:n};return i!==void 0&&(i.recursive!==void 0||i.ignoreIfNotExists!==void 0)&&(s.options=i),o!==void 0&&(s.annotationId=o),s}t.create=e;function r(n){let i=n;return i&&i.kind==="delete"&&x.string(i.uri)&&(i.options===void 0||(i.options.recursive===void 0||x.boolean(i.options.recursive))&&(i.options.ignoreIfNotExists===void 0||x.boolean(i.options.ignoreIfNotExists)))&&(i.annotationId===void 0||At.is(i.annotationId))}t.is=r})(ea||(ea={}));(function(t){function e(r){let n=r;return n&&(n.changes!==void 0||n.documentChanges!==void 0)&&(n.documentChanges===void 0||n.documentChanges.every(i=>x.string(i.kind)?Qs.is(i)||Zs.is(i)||ea.is(i):Lc.is(i)))}t.is=e})($d||($d={}));Js=class{constructor(e,r){this.edits=e,this.changeAnnotations=r}insert(e,r,n){let i,o;if(n===void 0?i=Cr.insert(e,r):At.is(n)?(o=n,i=wn.insert(e,r,n)):(this.assertChangeAnnotations(this.changeAnnotations),o=this.changeAnnotations.manage(n),i=wn.insert(e,r,o)),this.edits.push(i),o!==void 0)return o}replace(e,r,n){let i,o;if(n===void 0?i=Cr.replace(e,r):At.is(n)?(o=n,i=wn.replace(e,r,n)):(this.assertChangeAnnotations(this.changeAnnotations),o=this.changeAnnotations.manage(n),i=wn.replace(e,r,o)),this.edits.push(i),o!==void 0)return o}delete(e,r){let n,i;if(r===void 0?n=Cr.del(e):At.is(r)?(i=r,n=wn.del(e,r)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(r),n=wn.del(e,i)),this.edits.push(n),i!==void 0)return i}add(e){this.edits.push(e)}all(){return this.edits}clear(){this.edits.splice(0,this.edits.length)}assertChangeAnnotations(e){if(e===void 0)throw new Error("Text edit change is not configured to manage change annotations.")}},Md=class{constructor(e){this._annotations=e===void 0?Object.create(null):e,this._counter=0,this._size=0}all(){return this._annotations}get size(){return this._size}manage(e,r){let n;if(At.is(e)?n=e:(n=this.nextId(),r=e),this._annotations[n]!==void 0)throw new Error(`Id ${n} is already in use.`);if(r===void 0)throw new Error(`No annotation provided for id ${n}`);return this._annotations[n]=r,this._size++,n}nextId(){return this._counter++,this._counter.toString()}},Qh=class{constructor(e){this._textEditChanges=Object.create(null),e!==void 0?(this._workspaceEdit=e,e.documentChanges?(this._changeAnnotations=new Md(e.changeAnnotations),e.changeAnnotations=this._changeAnnotations.all(),e.documentChanges.forEach(r=>{if(Lc.is(r)){let n=new Js(r.edits,this._changeAnnotations);this._textEditChanges[r.textDocument.uri]=n}})):e.changes&&Object.keys(e.changes).forEach(r=>{let n=new Js(e.changes[r]);this._textEditChanges[r]=n})):this._workspaceEdit={}}get edit(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit}getTextEditChange(e){if(Fc.is(e)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");let r={uri:e.uri,version:e.version},n=this._textEditChanges[r.uri];if(!n){let i=[],o={textDocument:r,edits:i};this._workspaceEdit.documentChanges.push(o),n=new Js(i,this._changeAnnotations),this._textEditChanges[r.uri]=n}return n}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");let r=this._textEditChanges[e];if(!r){let n=[];this._workspaceEdit.changes[e]=n,r=new Js(n),this._textEditChanges[e]=r}return r}}initDocumentChanges(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new Md,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())}initChanges(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))}createFile(e,r,n){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");let i;Ki.is(r)||At.is(r)?i=r:n=r;let o,s;if(i===void 0?o=Qs.create(e,n):(s=At.is(i)?i:this._changeAnnotations.manage(i),o=Qs.create(e,n,s)),this._workspaceEdit.documentChanges.push(o),s!==void 0)return s}renameFile(e,r,n,i){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");let o;Ki.is(n)||At.is(n)?o=n:i=n;let s,a;if(o===void 0?s=Zs.create(e,r,i):(a=At.is(o)?o:this._changeAnnotations.manage(o),s=Zs.create(e,r,i,a)),this._workspaceEdit.documentChanges.push(s),a!==void 0)return a}deleteFile(e,r,n){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");let i;Ki.is(r)||At.is(r)?i=r:n=r;let o,s;if(i===void 0?o=ea.create(e,n):(s=At.is(i)?i:this._changeAnnotations.manage(i),o=ea.create(e,n,s)),this._workspaceEdit.documentChanges.push(o),s!==void 0)return s}};(function(t){function e(n){return{uri:n}}t.create=e;function r(n){let i=n;return x.defined(i)&&x.string(i.uri)}t.is=r})(Zh||(Zh={}));(function(t){function e(n,i){return{uri:n,version:i}}t.create=e;function r(n){let i=n;return x.defined(i)&&x.string(i.uri)&&x.integer(i.version)}t.is=r})(eg||(eg={}));(function(t){function e(n,i){return{uri:n,version:i}}t.create=e;function r(n){let i=n;return x.defined(i)&&x.string(i.uri)&&(i.version===null||x.integer(i.version))}t.is=r})(Fc||(Fc={}));(function(t){function e(n,i,o,s){return{uri:n,languageId:i,version:o,text:s}}t.create=e;function r(n){let i=n;return x.defined(i)&&x.string(i.uri)&&x.string(i.languageId)&&x.integer(i.version)&&x.string(i.text)}t.is=r})(tg||(tg={}));(function(t){t.PlainText="plaintext",t.Markdown="markdown";function e(r){let n=r;return n===t.PlainText||n===t.Markdown}t.is=e})(Ld||(Ld={}));(function(t){function e(r){let n=r;return x.objectLiteral(r)&&Ld.is(n.kind)&&x.string(n.value)}t.is=e})(ta||(ta={}));(function(t){t.Text=1,t.Method=2,t.Function=3,t.Constructor=4,t.Field=5,t.Variable=6,t.Class=7,t.Interface=8,t.Module=9,t.Property=10,t.Unit=11,t.Value=12,t.Enum=13,t.Keyword=14,t.Snippet=15,t.Color=16,t.File=17,t.Reference=18,t.Folder=19,t.EnumMember=20,t.Constant=21,t.Struct=22,t.Event=23,t.Operator=24,t.TypeParameter=25})(rg||(rg={}));(function(t){t.PlainText=1,t.Snippet=2})(ng||(ng={}));(function(t){t.Deprecated=1})(ig||(ig={}));(function(t){function e(n,i,o){return{newText:n,insert:i,replace:o}}t.create=e;function r(n){let i=n;return i&&x.string(i.newText)&&ne.is(i.insert)&&ne.is(i.replace)}t.is=r})(og||(og={}));(function(t){t.asIs=1,t.adjustIndentation=2})(sg||(sg={}));(function(t){function e(r){let n=r;return n&&(x.string(n.detail)||n.detail===void 0)&&(x.string(n.description)||n.description===void 0)}t.is=e})(ag||(ag={}));(function(t){function e(r){return{label:r}}t.create=e})(cg||(cg={}));(function(t){function e(r,n){return{items:r||[],isIncomplete:!!n}}t.create=e})(ug||(ug={}));(function(t){function e(n){return n.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}t.fromPlainText=e;function r(n){let i=n;return x.string(i)||x.objectLiteral(i)&&x.string(i.language)&&x.string(i.value)}t.is=r})(qc||(qc={}));(function(t){function e(r){let n=r;return!!n&&x.objectLiteral(n)&&(ta.is(n.contents)||qc.is(n.contents)||x.typedArray(n.contents,qc.is))&&(r.range===void 0||ne.is(r.range))}t.is=e})(lg||(lg={}));(function(t){function e(r,n){return n?{label:r,documentation:n}:{label:r}}t.create=e})(dg||(dg={}));(function(t){function e(r,n,...i){let o={label:r};return x.defined(n)&&(o.documentation=n),x.defined(i)?o.parameters=i:o.parameters=[],o}t.create=e})(fg||(fg={}));(function(t){t.Text=1,t.Read=2,t.Write=3})(pg||(pg={}));(function(t){function e(r,n){let i={range:r};return x.number(n)&&(i.kind=n),i}t.create=e})(mg||(mg={}));(function(t){t.File=1,t.Module=2,t.Namespace=3,t.Package=4,t.Class=5,t.Method=6,t.Property=7,t.Field=8,t.Constructor=9,t.Enum=10,t.Interface=11,t.Function=12,t.Variable=13,t.Constant=14,t.String=15,t.Number=16,t.Boolean=17,t.Array=18,t.Object=19,t.Key=20,t.Null=21,t.EnumMember=22,t.Struct=23,t.Event=24,t.Operator=25,t.TypeParameter=26})(hg||(hg={}));(function(t){t.Deprecated=1})(gg||(gg={}));(function(t){function e(r,n,i,o,s){let a={name:r,kind:n,location:{uri:o,range:i}};return s&&(a.containerName=s),a}t.create=e})(yg||(yg={}));(function(t){function e(r,n,i,o){return o!==void 0?{name:r,kind:n,location:{uri:i,range:o}}:{name:r,kind:n,location:{uri:i}}}t.create=e})(vg||(vg={}));(function(t){function e(n,i,o,s,a,c){let u={name:n,detail:i,kind:o,range:s,selectionRange:a};return c!==void 0&&(u.children=c),u}t.create=e;function r(n){let i=n;return i&&x.string(i.name)&&x.number(i.kind)&&ne.is(i.range)&&ne.is(i.selectionRange)&&(i.detail===void 0||x.string(i.detail))&&(i.deprecated===void 0||x.boolean(i.deprecated))&&(i.children===void 0||Array.isArray(i.children))&&(i.tags===void 0||Array.isArray(i.tags))}t.is=r})(xg||(xg={}));(function(t){t.Empty="",t.QuickFix="quickfix",t.Refactor="refactor",t.RefactorExtract="refactor.extract",t.RefactorInline="refactor.inline",t.RefactorRewrite="refactor.rewrite",t.Source="source",t.SourceOrganizeImports="source.organizeImports",t.SourceFixAll="source.fixAll"})(Tg||(Tg={}));(function(t){t.Invoked=1,t.Automatic=2})(jc||(jc={}));(function(t){function e(n,i,o){let s={diagnostics:n};return i!=null&&(s.only=i),o!=null&&(s.triggerKind=o),s}t.create=e;function r(n){let i=n;return x.defined(i)&&x.typedArray(i.diagnostics,Mc.is)&&(i.only===void 0||x.typedArray(i.only,x.string))&&(i.triggerKind===void 0||i.triggerKind===jc.Invoked||i.triggerKind===jc.Automatic)}t.is=r})(Rg||(Rg={}));(function(t){function e(n,i,o){let s={title:n},a=!0;return typeof i=="string"?(a=!1,s.kind=i):Vi.is(i)?s.command=i:s.edit=i,a&&o!==void 0&&(s.kind=o),s}t.create=e;function r(n){let i=n;return i&&x.string(i.title)&&(i.diagnostics===void 0||x.typedArray(i.diagnostics,Mc.is))&&(i.kind===void 0||x.string(i.kind))&&(i.edit!==void 0||i.command!==void 0)&&(i.command===void 0||Vi.is(i.command))&&(i.isPreferred===void 0||x.boolean(i.isPreferred))&&(i.edit===void 0||$d.is(i.edit))}t.is=r})(Sg||(Sg={}));(function(t){function e(n,i){let o={range:n};return x.defined(i)&&(o.data=i),o}t.create=e;function r(n){let i=n;return x.defined(i)&&ne.is(i.range)&&(x.undefined(i.command)||Vi.is(i.command))}t.is=r})(bg||(bg={}));(function(t){function e(n,i){return{tabSize:n,insertSpaces:i}}t.create=e;function r(n){let i=n;return x.defined(i)&&x.uinteger(i.tabSize)&&x.boolean(i.insertSpaces)}t.is=r})(Eg||(Eg={}));(function(t){function e(n,i,o){return{range:n,target:i,data:o}}t.create=e;function r(n){let i=n;return x.defined(i)&&ne.is(i.range)&&(x.undefined(i.target)||x.string(i.target))}t.is=r})(Cg||(Cg={}));(function(t){function e(n,i){return{range:n,parent:i}}t.create=e;function r(n){let i=n;return x.objectLiteral(i)&&ne.is(i.range)&&(i.parent===void 0||t.is(i.parent))}t.is=r})(_g||(_g={}));(function(t){t.namespace="namespace",t.type="type",t.class="class",t.enum="enum",t.interface="interface",t.struct="struct",t.typeParameter="typeParameter",t.parameter="parameter",t.variable="variable",t.property="property",t.enumMember="enumMember",t.event="event",t.function="function",t.method="method",t.macro="macro",t.keyword="keyword",t.modifier="modifier",t.comment="comment",t.string="string",t.number="number",t.regexp="regexp",t.operator="operator",t.decorator="decorator"})(Ag||(Ag={}));(function(t){t.declaration="declaration",t.definition="definition",t.readonly="readonly",t.static="static",t.deprecated="deprecated",t.abstract="abstract",t.async="async",t.modification="modification",t.documentation="documentation",t.defaultLibrary="defaultLibrary"})(kg||(kg={}));(function(t){function e(r){let n=r;return x.objectLiteral(n)&&(n.resultId===void 0||typeof n.resultId=="string")&&Array.isArray(n.data)&&(n.data.length===0||typeof n.data[0]=="number")}t.is=e})(wg||(wg={}));(function(t){function e(n,i){return{range:n,text:i}}t.create=e;function r(n){let i=n;return i!=null&&ne.is(i.range)&&x.string(i.text)}t.is=r})(Pg||(Pg={}));(function(t){function e(n,i,o){return{range:n,variableName:i,caseSensitiveLookup:o}}t.create=e;function r(n){let i=n;return i!=null&&ne.is(i.range)&&x.boolean(i.caseSensitiveLookup)&&(x.string(i.variableName)||i.variableName===void 0)}t.is=r})(Ng||(Ng={}));(function(t){function e(n,i){return{range:n,expression:i}}t.create=e;function r(n){let i=n;return i!=null&&ne.is(i.range)&&(x.string(i.expression)||i.expression===void 0)}t.is=r})(Og||(Og={}));(function(t){function e(n,i){return{frameId:n,stoppedLocation:i}}t.create=e;function r(n){let i=n;return x.defined(i)&&ne.is(n.stoppedLocation)}t.is=r})(Ig||(Ig={}));(function(t){t.Type=1,t.Parameter=2;function e(r){return r===1||r===2}t.is=e})(Fd||(Fd={}));(function(t){function e(n){return{value:n}}t.create=e;function r(n){let i=n;return x.objectLiteral(i)&&(i.tooltip===void 0||x.string(i.tooltip)||ta.is(i.tooltip))&&(i.location===void 0||$c.is(i.location))&&(i.command===void 0||Vi.is(i.command))}t.is=r})(qd||(qd={}));(function(t){function e(n,i,o){let s={position:n,label:i};return o!==void 0&&(s.kind=o),s}t.create=e;function r(n){let i=n;return x.objectLiteral(i)&&ue.is(i.position)&&(x.string(i.label)||x.typedArray(i.label,qd.is))&&(i.kind===void 0||Fd.is(i.kind))&&i.textEdits===void 0||x.typedArray(i.textEdits,Cr.is)&&(i.tooltip===void 0||x.string(i.tooltip)||ta.is(i.tooltip))&&(i.paddingLeft===void 0||x.boolean(i.paddingLeft))&&(i.paddingRight===void 0||x.boolean(i.paddingRight))}t.is=r})(Dg||(Dg={}));(function(t){function e(r){return{kind:"snippet",value:r}}t.createSnippet=e})($g||($g={}));(function(t){function e(r,n,i,o){return{insertText:r,filterText:n,range:i,command:o}}t.create=e})(Mg||(Mg={}));(function(t){function e(r){return{items:r}}t.create=e})(Lg||(Lg={}));(function(t){t.Invoked=0,t.Automatic=1})(Fg||(Fg={}));(function(t){function e(r,n){return{range:r,text:n}}t.create=e})(qg||(qg={}));(function(t){function e(r,n){return{triggerKind:r,selectedCompletionInfo:n}}t.create=e})(jg||(jg={}));(function(t){function e(r){let n=r;return x.objectLiteral(n)&&Od.is(n.uri)&&x.string(n.name)}t.is=e})(Ug||(Ug={}));RF=[`
`,`\r
`,"\r"];(function(t){function e(o,s,a,c){return new Wg(o,s,a,c)}t.create=e;function r(o){let s=o;return!!(x.defined(s)&&x.string(s.uri)&&(x.undefined(s.languageId)||x.string(s.languageId))&&x.uinteger(s.lineCount)&&x.func(s.getText)&&x.func(s.positionAt)&&x.func(s.offsetAt))}t.is=r;function n(o,s){let a=o.getText(),c=i(s,(l,d)=>{let f=l.range.start.line-d.range.start.line;return f===0?l.range.start.character-d.range.start.character:f}),u=a.length;for(let l=c.length-1;l>=0;l--){let d=c[l],f=o.offsetAt(d.range.start),m=o.offsetAt(d.range.end);if(m<=u)a=a.substring(0,f)+d.newText+a.substring(m,a.length);else throw new Error("Overlapping edit");u=f}return a}t.applyEdits=n;function i(o,s){if(o.length<=1)return o;let a=o.length/2|0,c=o.slice(0,a),u=o.slice(a);i(c,s),i(u,s);let l=0,d=0,f=0;for(;l<c.length&&d<u.length;)s(c[l],u[d])<=0?o[f++]=c[l++]:o[f++]=u[d++];for(;l<c.length;)o[f++]=c[l++];for(;d<u.length;)o[f++]=u[d++];return o}})(Bg||(Bg={}));Wg=class{constructor(e,r,n,i){this._uri=e,this._languageId=r,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let r=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(r,n)}return this._content}update(e,r){this._content=e.text,this._version=r,this._lineOffsets=void 0}getLineOffsets(){if(this._lineOffsets===void 0){let e=[],r=this._content,n=!0;for(let i=0;i<r.length;i++){n&&(e.push(i),n=!1);let o=r.charAt(i);n=o==="\r"||o===`
`,o==="\r"&&i+1<r.length&&r.charAt(i+1)===`
`&&i++}n&&r.length>0&&e.push(r.length),this._lineOffsets=e}return this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let r=this.getLineOffsets(),n=0,i=r.length;if(i===0)return ue.create(0,e);for(;n<i;){let s=Math.floor((n+i)/2);r[s]>e?i=s:n=s+1}let o=n-1;return ue.create(o,e-r[o])}offsetAt(e){let r=this.getLineOffsets();if(e.line>=r.length)return this._content.length;if(e.line<0)return 0;let n=r[e.line],i=e.line+1<r.length?r[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,i),n)}get lineCount(){return this.getLineOffsets().length}};(function(t){let e=Object.prototype.toString;function r(m){return typeof m<"u"}t.defined=r;function n(m){return typeof m>"u"}t.undefined=n;function i(m){return m===!0||m===!1}t.boolean=i;function o(m){return e.call(m)==="[object String]"}t.string=o;function s(m){return e.call(m)==="[object Number]"}t.number=s;function a(m,v,T){return e.call(m)==="[object Number]"&&v<=m&&m<=T}t.numberRange=a;function c(m){return e.call(m)==="[object Number]"&&-2147483648<=m&&m<=2147483647}t.integer=c;function u(m){return e.call(m)==="[object Number]"&&0<=m&&m<=2147483647}t.uinteger=u;function l(m){return e.call(m)==="[object Function]"}t.func=l;function d(m){return m!==null&&typeof m=="object"}t.objectLiteral=d;function f(m,v){return Array.isArray(m)&&m.every(v)}t.typedArray=f})(x||(x={}))});var si=$(Qg=>{"use strict";Object.defineProperty(Qg,"__esModule",{value:!0});var Yg;function Jg(){if(Yg===void 0)throw new Error("No runtime abstraction layer installed");return Yg}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");Yg=r}t.install=e})(Jg||(Jg={}));Qg.default=Jg});var ia=$(It=>{"use strict";Object.defineProperty(It,"__esModule",{value:!0});It.stringArray=It.array=It.func=It.error=It.number=It.string=It.boolean=void 0;function OF(t){return t===!0||t===!1}It.boolean=OF;function Qb(t){return typeof t=="string"||t instanceof String}It.string=Qb;function IF(t){return typeof t=="number"||t instanceof Number}It.number=IF;function DF(t){return t instanceof Error}It.error=DF;function $F(t){return typeof t=="function"}It.func=$F;function Zb(t){return Array.isArray(t)}It.array=Zb;function MF(t){return Zb(t)&&t.every(e=>Qb(e))}It.stringArray=MF});var Zi=$(oa=>{"use strict";Object.defineProperty(oa,"__esModule",{value:!0});oa.Emitter=oa.Event=void 0;var LF=si(),eE;(function(t){let e={dispose(){}};t.None=function(){return e}})(eE||(oa.Event=eE={}));var Zg=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,o=this._callbacks.length;i<o;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let o=0,s=n.length;o<s;o++)try{r.push(n[o].apply(i[o],e))}catch(a){(0,LF.default)().console.error(a)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},Gd=class t{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new Zg),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=t._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};oa.Emitter=Gd;Gd._noop=function(){}});var zc=$(sa=>{"use strict";Object.defineProperty(sa,"__esModule",{value:!0});sa.CancellationTokenSource=sa.CancellationToken=void 0;var FF=si(),qF=ia(),ey=Zi(),Hd;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:ey.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:ey.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||qF.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(Hd||(sa.CancellationToken=Hd={}));var jF=Object.freeze(function(t,e){let r=(0,FF.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),Kd=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?jF:(this._emitter||(this._emitter=new ey.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},ty=class{get token(){return this._token||(this._token=new Kd),this._token}cancel(){this._token?this._token.cancel():this._token=Hd.Cancelled}dispose(){this._token?this._token instanceof Kd&&this._token.dispose():this._token=Hd.None}};sa.CancellationTokenSource=ty});var Fy=$(W=>{"use strict";Object.defineProperty(W,"__esModule",{value:!0});W.Message=W.NotificationType9=W.NotificationType8=W.NotificationType7=W.NotificationType6=W.NotificationType5=W.NotificationType4=W.NotificationType3=W.NotificationType2=W.NotificationType1=W.NotificationType0=W.NotificationType=W.RequestType9=W.RequestType8=W.RequestType7=W.RequestType6=W.RequestType5=W.RequestType4=W.RequestType3=W.RequestType2=W.RequestType1=W.RequestType=W.RequestType0=W.AbstractMessageSignature=W.ParameterStructures=W.ResponseError=W.ErrorCodes=void 0;var co=ia(),my;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(my||(W.ErrorCodes=my={}));var hy=class t extends Error{constructor(e,r,n){super(r),this.code=co.number(e)?e:my.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,t.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};W.ResponseError=hy;var or=class t{constructor(e){this.kind=e}static is(e){return e===t.auto||e===t.byName||e===t.byPosition}toString(){return this.kind}};W.ParameterStructures=or;or.auto=new or("auto");or.byPosition=new or("byPosition");or.byName=new or("byName");var De=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return or.auto}};W.AbstractMessageSignature=De;var gy=class extends De{constructor(e){super(e,0)}};W.RequestType0=gy;var yy=class extends De{constructor(e,r=or.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};W.RequestType=yy;var vy=class extends De{constructor(e,r=or.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};W.RequestType1=vy;var xy=class extends De{constructor(e){super(e,2)}};W.RequestType2=xy;var Ty=class extends De{constructor(e){super(e,3)}};W.RequestType3=Ty;var Ry=class extends De{constructor(e){super(e,4)}};W.RequestType4=Ry;var Sy=class extends De{constructor(e){super(e,5)}};W.RequestType5=Sy;var by=class extends De{constructor(e){super(e,6)}};W.RequestType6=by;var Ey=class extends De{constructor(e){super(e,7)}};W.RequestType7=Ey;var Cy=class extends De{constructor(e){super(e,8)}};W.RequestType8=Cy;var _y=class extends De{constructor(e){super(e,9)}};W.RequestType9=_y;var Ay=class extends De{constructor(e,r=or.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};W.NotificationType=Ay;var ky=class extends De{constructor(e){super(e,0)}};W.NotificationType0=ky;var wy=class extends De{constructor(e,r=or.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};W.NotificationType1=wy;var Py=class extends De{constructor(e){super(e,2)}};W.NotificationType2=Py;var Ny=class extends De{constructor(e){super(e,3)}};W.NotificationType3=Ny;var Oy=class extends De{constructor(e){super(e,4)}};W.NotificationType4=Oy;var Iy=class extends De{constructor(e){super(e,5)}};W.NotificationType5=Iy;var Dy=class extends De{constructor(e){super(e,6)}};W.NotificationType6=Dy;var $y=class extends De{constructor(e){super(e,7)}};W.NotificationType7=$y;var My=class extends De{constructor(e){super(e,8)}};W.NotificationType8=My;var Ly=class extends De{constructor(e){super(e,9)}};W.NotificationType9=Ly;var TE;(function(t){function e(i){let o=i;return o&&co.string(o.method)&&(co.string(o.id)||co.number(o.id))}t.isRequest=e;function r(i){let o=i;return o&&co.string(o.method)&&i.id===void 0}t.isNotification=r;function n(i){let o=i;return o&&(o.result!==void 0||!!o.error)&&(co.string(o.id)||co.number(o.id)||o.id===null)}t.isResponse=n})(TE||(W.Message=TE={}))});var jy=$(ui=>{"use strict";var RE;Object.defineProperty(ui,"__esModule",{value:!0});ui.LRUCache=ui.LinkedMap=ui.Touch=void 0;var Dt;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(Dt||(ui.Touch=Dt={}));var cf=class{constructor(){this[RE]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=Dt.None){let n=this._map.get(e);if(n)return r!==Dt.None&&this.touch(n,r),n.value}set(e,r,n=Dt.None){let i=this._map.get(e);if(i)i.value=r,n!==Dt.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case Dt.None:this.addItemLast(i);break;case Dt.First:this.addItemFirst(i);break;case Dt.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(RE=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==Dt.First&&r!==Dt.Last)){if(r===Dt.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===Dt.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};ui.LinkedMap=cf;var qy=class extends cf{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=Dt.AsNew){return super.get(e,r)}peek(e){return super.get(e,Dt.None)}set(e,r){return super.set(e,r,Dt.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};ui.LRUCache=qy});var bE=$(uf=>{"use strict";Object.defineProperty(uf,"__esModule",{value:!0});uf.Disposable=void 0;var SE;(function(t){function e(r){return{dispose:r}}t.create=e})(SE||(uf.Disposable=SE={}))});var EE=$(pa=>{"use strict";Object.defineProperty(pa,"__esModule",{value:!0});pa.SharedArrayReceiverStrategy=pa.SharedArraySenderStrategy=void 0;var i1=zc(),ku;(function(t){t.Continue=0,t.Cancelled=1})(ku||(ku={}));var Uy=class{constructor(){this.buffers=new Map}enableCancellation(e){if(e.id===null)return;let r=new SharedArrayBuffer(4),n=new Int32Array(r,0,1);n[0]=ku.Continue,this.buffers.set(e.id,r),e.$cancellationData=r}async sendCancellation(e,r){let n=this.buffers.get(r);if(n===void 0)return;let i=new Int32Array(n,0,1);Atomics.store(i,0,ku.Cancelled)}cleanup(e){this.buffers.delete(e)}dispose(){this.buffers.clear()}};pa.SharedArraySenderStrategy=Uy;var By=class{constructor(e){this.data=new Int32Array(e,0,1)}get isCancellationRequested(){return Atomics.load(this.data,0)===ku.Cancelled}get onCancellationRequested(){throw new Error("Cancellation over SharedArrayBuffer doesn't support cancellation events")}},Wy=class{constructor(e){this.token=new By(e)}cancel(){}dispose(){}},Gy=class{constructor(){this.kind="request"}createCancellationTokenSource(e){let r=e.$cancellationData;return r===void 0?new i1.CancellationTokenSource:new Wy(r)}};pa.SharedArrayReceiverStrategy=Gy});var Ky=$(lf=>{"use strict";Object.defineProperty(lf,"__esModule",{value:!0});lf.Semaphore=void 0;var o1=si(),Hy=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,o1.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};lf.Semaphore=Hy});var _E=$(li=>{"use strict";Object.defineProperty(li,"__esModule",{value:!0});li.ReadableStreamMessageReader=li.AbstractMessageReader=li.MessageReader=void 0;var zy=si(),ma=ia(),Vy=Zi(),s1=Ky(),CE;(function(t){function e(r){let n=r;return n&&ma.func(n.listen)&&ma.func(n.dispose)&&ma.func(n.onError)&&ma.func(n.onClose)&&ma.func(n.onPartialMessage)}t.is=e})(CE||(li.MessageReader=CE={}));var df=class{constructor(){this.errorEmitter=new Vy.Emitter,this.closeEmitter=new Vy.Emitter,this.partialMessageEmitter=new Vy.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${ma.string(e.message)?e.message:"unknown"}`)}};li.AbstractMessageReader=df;var Xy;(function(t){function e(r){let n,i,o,s=new Map,a,c=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(o=r.contentDecoder,s.set(o.name,o)),r.contentDecoders!==void 0)for(let u of r.contentDecoders)s.set(u.name,u);if(r.contentTypeDecoder!==void 0&&(a=r.contentTypeDecoder,c.set(a.name,a)),r.contentTypeDecoders!==void 0)for(let u of r.contentTypeDecoders)c.set(u.name,u)}return a===void 0&&(a=(0,zy.default)().applicationJson.decoder,c.set(a.name,a)),{charset:n,contentDecoder:o,contentDecoders:s,contentTypeDecoder:a,contentTypeDecoders:c}}t.fromOptions=e})(Xy||(Xy={}));var Yy=class extends df{constructor(e,r){super(),this.readable=e,this.options=Xy.fromOptions(r),this.buffer=(0,zy.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0,this.readSemaphore=new s1.Semaphore(1)}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){try{for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let n=this.buffer.tryReadHeaders(!0);if(!n)return;let i=n.get("content-length");if(!i){this.fireError(new Error(`Header must provide a Content-Length property.
${JSON.stringify(Object.fromEntries(n))}`));return}let o=parseInt(i);if(isNaN(o)){this.fireError(new Error(`Content-Length value must be a number. Got ${i}`));return}this.nextMessageLength=o}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1,this.readSemaphore.lock(async()=>{let n=this.options.contentDecoder!==void 0?await this.options.contentDecoder.decode(r):r,i=await this.options.contentTypeDecoder.decode(n,this.options);this.callback(i)}).catch(n=>{this.fireError(n)})}}catch(r){this.fireError(r)}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,zy.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};li.ReadableStreamMessageReader=Yy});var NE=$(di=>{"use strict";Object.defineProperty(di,"__esModule",{value:!0});di.WriteableStreamMessageWriter=di.AbstractMessageWriter=di.MessageWriter=void 0;var AE=si(),wu=ia(),a1=Ky(),kE=Zi(),c1="Content-Length: ",wE=`\r
`,PE;(function(t){function e(r){let n=r;return n&&wu.func(n.dispose)&&wu.func(n.onClose)&&wu.func(n.onError)&&wu.func(n.write)}t.is=e})(PE||(di.MessageWriter=PE={}));var ff=class{constructor(){this.errorEmitter=new kE.Emitter,this.closeEmitter=new kE.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${wu.string(e.message)?e.message:"unknown"}`)}};di.AbstractMessageWriter=ff;var Jy;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,AE.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,AE.default)().applicationJson.encoder}}t.fromOptions=e})(Jy||(Jy={}));var Qy=class extends ff{constructor(e,r){super(),this.writable=e,this.options=Jy.fromOptions(r),this.errorCount=0,this.writeSemaphore=new a1.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(c1,n.byteLength.toString(),wE),i.push(wE),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};di.WriteableStreamMessageWriter=Qy});var OE=$(pf=>{"use strict";Object.defineProperty(pf,"__esModule",{value:!0});pf.AbstractMessageBuffer=void 0;var u1=13,l1=10,d1=`\r
`,Zy=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(e=!1){if(this._chunks.length===0)return;let r=0,n=0,i=0,o=0;e:for(;n<this._chunks.length;){let u=this._chunks[n];for(i=0;i<u.length;){switch(u[i]){case u1:switch(r){case 0:r=1;break;case 2:r=3;break;default:r=0}break;case l1:switch(r){case 1:r=2;break;case 3:r=4,i++;break e;default:r=0}break;default:r=0}i++}o+=u.byteLength,n++}if(r!==4)return;let s=this._read(o+i),a=new Map,c=this.toString(s,"ascii").split(d1);if(c.length<2)return a;for(let u=0;u<c.length-2;u++){let l=c[u],d=l.indexOf(":");if(d===-1)throw new Error(`Message header must separate key and value using ':'
${l}`);let f=l.substr(0,d),m=l.substr(d+1).trim();a.set(e?f.toLowerCase():f,m)}return a}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let o=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(o)}if(this._chunks[0].byteLength>e){let o=this._chunks[0],s=this.asNative(o,e);return this._chunks[0]=o.slice(e),this._totalLength-=e,s}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let o=this._chunks[i];if(o.byteLength>e){let s=o.slice(0,e);r.set(s,n),n+=e,this._chunks[i]=o.slice(e),this._totalLength-=e,e-=e}else r.set(o,n),n+=o.byteLength,this._chunks.shift(),this._totalLength-=o.byteLength,e-=o.byteLength}return r}};pf.AbstractMessageBuffer=Zy});var LE=$(J=>{"use strict";Object.defineProperty(J,"__esModule",{value:!0});J.createMessageConnection=J.ConnectionOptions=J.MessageStrategy=J.CancellationStrategy=J.CancellationSenderStrategy=J.CancellationReceiverStrategy=J.RequestCancellationReceiverStrategy=J.IdCancellationReceiverStrategy=J.ConnectionStrategy=J.ConnectionError=J.ConnectionErrors=J.LogTraceNotification=J.SetTraceNotification=J.TraceFormat=J.TraceValues=J.Trace=J.NullLogger=J.ProgressType=J.ProgressToken=void 0;var IE=si(),ze=ia(),V=Fy(),DE=jy(),Pu=Zi(),ev=zc(),Iu;(function(t){t.type=new V.NotificationType("$/cancelRequest")})(Iu||(Iu={}));var tv;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(tv||(J.ProgressToken=tv={}));var Nu;(function(t){t.type=new V.NotificationType("$/progress")})(Nu||(Nu={}));var rv=class{constructor(){}};J.ProgressType=rv;var nv;(function(t){function e(r){return ze.func(r)}t.is=e})(nv||(nv={}));J.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var fe;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(fe||(J.Trace=fe={}));var $E;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})($E||(J.TraceValues=$E={}));(function(t){function e(n){if(!ze.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(fe||(J.Trace=fe={}));var vr;(function(t){t.Text="text",t.JSON="json"})(vr||(J.TraceFormat=vr={}));(function(t){function e(r){return ze.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(vr||(J.TraceFormat=vr={}));var iv;(function(t){t.type=new V.NotificationType("$/setTrace")})(iv||(J.SetTraceNotification=iv={}));var mf;(function(t){t.type=new V.NotificationType("$/logTrace")})(mf||(J.LogTraceNotification=mf={}));var Ou;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(Ou||(J.ConnectionErrors=Ou={}));var ha=class t extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,t.prototype)}};J.ConnectionError=ha;var ov;(function(t){function e(r){let n=r;return n&&ze.func(n.cancelUndispatched)}t.is=e})(ov||(J.ConnectionStrategy=ov={}));var hf;(function(t){function e(r){let n=r;return n&&(n.kind===void 0||n.kind==="id")&&ze.func(n.createCancellationTokenSource)&&(n.dispose===void 0||ze.func(n.dispose))}t.is=e})(hf||(J.IdCancellationReceiverStrategy=hf={}));var sv;(function(t){function e(r){let n=r;return n&&n.kind==="request"&&ze.func(n.createCancellationTokenSource)&&(n.dispose===void 0||ze.func(n.dispose))}t.is=e})(sv||(J.RequestCancellationReceiverStrategy=sv={}));var gf;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new ev.CancellationTokenSource}});function e(r){return hf.is(r)||sv.is(r)}t.is=e})(gf||(J.CancellationReceiverStrategy=gf={}));var yf;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(Iu.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&ze.func(n.sendCancellation)&&ze.func(n.cleanup)}t.is=e})(yf||(J.CancellationSenderStrategy=yf={}));var vf;(function(t){t.Message=Object.freeze({receiver:gf.Message,sender:yf.Message});function e(r){let n=r;return n&&gf.is(n.receiver)&&yf.is(n.sender)}t.is=e})(vf||(J.CancellationStrategy=vf={}));var xf;(function(t){function e(r){let n=r;return n&&ze.func(n.handleMessage)}t.is=e})(xf||(J.MessageStrategy=xf={}));var ME;(function(t){function e(r){let n=r;return n&&(vf.is(n.cancellationStrategy)||ov.is(n.connectionStrategy)||xf.is(n.messageStrategy))}t.is=e})(ME||(J.ConnectionOptions=ME={}));var Br;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(Br||(Br={}));function f1(t,e,r,n){let i=r!==void 0?r:J.NullLogger,o=0,s=0,a=0,c="2.0",u,l=new Map,d,f=new Map,m=new Map,v,T=new DE.LinkedMap,C=new Map,R=new Set,g=new Map,p=fe.Off,S=vr.Text,w,Q=Br.New,Vt=new Pu.Emitter,et=new Pu.Emitter,dr=new Pu.Emitter,zt=new Pu.Emitter,I=new Pu.Emitter,_=n&&n.cancellationStrategy?n.cancellationStrategy:vf.Message;function j(y){if(y===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+y.toString()}function M(y){return y===null?"res-unknown-"+(++a).toString():"res-"+y.toString()}function oe(){return"not-"+(++s).toString()}function z(y,A){V.Message.isRequest(A)?y.set(j(A.id),A):V.Message.isResponse(A)?y.set(M(A.id),A):y.set(oe(),A)}function H(y){}function dt(){return Q===Br.Listening}function L(){return Q===Br.Closed}function b(){return Q===Br.Disposed}function Te(){(Q===Br.New||Q===Br.Listening)&&(Q=Br.Closed,et.fire(void 0))}function rl(y){Vt.fire([y,void 0,void 0])}function lm(y){Vt.fire(y)}t.onClose(Te),t.onError(rl),e.onClose(Te),e.onError(lm);function La(){v||T.size===0||(v=(0,IE.default)().timer.setImmediate(()=>{v=void 0,nl()}))}function Xt(y){V.Message.isRequest(y)?Yt(y):V.Message.isNotification(y)?Ft(y):V.Message.isResponse(y)?Mn(y):$r(y)}function nl(){if(T.size===0)return;let y=T.shift();try{let A=n?.messageStrategy;xf.is(A)?A.handleMessage(y,Xt):Xt(y)}finally{La()}}let gt=y=>{try{if(V.Message.isNotification(y)&&y.method===Iu.type.method){let A=y.params.id,N=j(A),U=T.get(N);if(V.Message.isRequest(U)){let ye=n?.connectionStrategy,Ye=ye&&ye.cancelUndispatched?ye.cancelUndispatched(U,H):void 0;if(Ye&&(Ye.error!==void 0||Ye.result!==void 0)){T.delete(N),g.delete(A),Ye.id=U.id,Ln(Ye,y.method,Date.now()),e.write(Ye).catch(()=>i.error("Sending response for canceled message failed."));return}}let we=g.get(A);if(we!==void 0){we.cancel(),dm(y);return}else R.add(A)}z(T,y)}finally{La()}};function Yt(y){if(b())return;function A(ce,We,he){let ft={jsonrpc:c,id:y.id};ce instanceof V.ResponseError?ft.error=ce.toJson():ft.result=ce===void 0?null:ce,Ln(ft,We,he),e.write(ft).catch(()=>i.error("Sending response failed."))}function N(ce,We,he){let ft={jsonrpc:c,id:y.id,error:ce.toJson()};Ln(ft,We,he),e.write(ft).catch(()=>i.error("Sending response failed."))}function U(ce,We,he){ce===void 0&&(ce=null);let ft={jsonrpc:c,id:y.id,result:ce};Ln(ft,We,he),e.write(ft).catch(()=>i.error("Sending response failed."))}il(y);let we=l.get(y.method),ye,Ye;we&&(ye=we.type,Ye=we.handler);let tt=Date.now();if(Ye||u){let ce=y.id??String(Date.now()),We=hf.is(_.receiver)?_.receiver.createCancellationTokenSource(ce):_.receiver.createCancellationTokenSource(y);y.id!==null&&R.has(y.id)&&We.cancel(),y.id!==null&&g.set(ce,We);try{let he;if(Ye)if(y.params===void 0){if(ye!==void 0&&ye.numberOfParams!==0){N(new V.ResponseError(V.ErrorCodes.InvalidParams,`Request ${y.method} defines ${ye.numberOfParams} params but received none.`),y.method,tt);return}he=Ye(We.token)}else if(Array.isArray(y.params)){if(ye!==void 0&&ye.parameterStructures===V.ParameterStructures.byName){N(new V.ResponseError(V.ErrorCodes.InvalidParams,`Request ${y.method} defines parameters by name but received parameters by position`),y.method,tt);return}he=Ye(...y.params,We.token)}else{if(ye!==void 0&&ye.parameterStructures===V.ParameterStructures.byPosition){N(new V.ResponseError(V.ErrorCodes.InvalidParams,`Request ${y.method} defines parameters by position but received parameters by name`),y.method,tt);return}he=Ye(y.params,We.token)}else u&&(he=u(y.method,y.params,We.token));let ft=he;he?ft.then?ft.then(qt=>{g.delete(ce),A(qt,y.method,tt)},qt=>{g.delete(ce),qt instanceof V.ResponseError?N(qt,y.method,tt):qt&&ze.string(qt.message)?N(new V.ResponseError(V.ErrorCodes.InternalError,`Request ${y.method} failed with message: ${qt.message}`),y.method,tt):N(new V.ResponseError(V.ErrorCodes.InternalError,`Request ${y.method} failed unexpectedly without providing any details.`),y.method,tt)}):(g.delete(ce),A(he,y.method,tt)):(g.delete(ce),U(he,y.method,tt))}catch(he){g.delete(ce),he instanceof V.ResponseError?A(he,y.method,tt):he&&ze.string(he.message)?N(new V.ResponseError(V.ErrorCodes.InternalError,`Request ${y.method} failed with message: ${he.message}`),y.method,tt):N(new V.ResponseError(V.ErrorCodes.InternalError,`Request ${y.method} failed unexpectedly without providing any details.`),y.method,tt)}}else N(new V.ResponseError(V.ErrorCodes.MethodNotFound,`Unhandled method ${y.method}`),y.method,tt)}function Mn(y){if(!b())if(y.id===null)y.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(y.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let A=y.id,N=C.get(A);if(cw(y,N),N!==void 0){C.delete(A);try{if(y.error){let U=y.error;N.reject(new V.ResponseError(U.code,U.message,U.data))}else if(y.result!==void 0)N.resolve(y.result);else throw new Error("Should never happen.")}catch(U){U.message?i.error(`Response handler '${N.method}' failed with message: ${U.message}`):i.error(`Response handler '${N.method}' failed unexpectedly.`)}}}}function Ft(y){if(b())return;let A,N;if(y.method===Iu.type.method){let U=y.params.id;R.delete(U),dm(y);return}else{let U=f.get(y.method);U&&(N=U.handler,A=U.type)}if(N||d)try{if(dm(y),N)if(y.params===void 0)A!==void 0&&A.numberOfParams!==0&&A.parameterStructures!==V.ParameterStructures.byName&&i.error(`Notification ${y.method} defines ${A.numberOfParams} params but received none.`),N();else if(Array.isArray(y.params)){let U=y.params;y.method===Nu.type.method&&U.length===2&&tv.is(U[0])?N({token:U[0],value:U[1]}):(A!==void 0&&(A.parameterStructures===V.ParameterStructures.byName&&i.error(`Notification ${y.method} defines parameters by name but received parameters by position`),A.numberOfParams!==y.params.length&&i.error(`Notification ${y.method} defines ${A.numberOfParams} params but received ${U.length} arguments`)),N(...U))}else A!==void 0&&A.parameterStructures===V.ParameterStructures.byPosition&&i.error(`Notification ${y.method} defines parameters by position but received parameters by name`),N(y.params);else d&&d(y.method,y.params)}catch(U){U.message?i.error(`Notification handler '${y.method}' failed with message: ${U.message}`):i.error(`Notification handler '${y.method}' failed unexpectedly.`)}else dr.fire(y)}function $r(y){if(!y){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(y,null,4)}`);let A=y;if(ze.string(A.id)||ze.number(A.id)){let N=A.id,U=C.get(N);U&&U.reject(new Error("The received response has neither a result nor an error property."))}}function bt(y){if(y!=null)switch(p){case fe.Verbose:return JSON.stringify(y,null,4);case fe.Compact:return JSON.stringify(y);default:return}}function Mr(y){if(!(p===fe.Off||!w))if(S===vr.Text){let A;(p===fe.Verbose||p===fe.Compact)&&y.params&&(A=`Params: ${bt(y.params)}

`),w.log(`Sending request '${y.method} - (${y.id})'.`,A)}else go("send-request",y)}function gn(y){if(!(p===fe.Off||!w))if(S===vr.Text){let A;(p===fe.Verbose||p===fe.Compact)&&(y.params?A=`Params: ${bt(y.params)}

`:A=`No parameters provided.

`),w.log(`Sending notification '${y.method}'.`,A)}else go("send-notification",y)}function Ln(y,A,N){if(!(p===fe.Off||!w))if(S===vr.Text){let U;(p===fe.Verbose||p===fe.Compact)&&(y.error&&y.error.data?U=`Error data: ${bt(y.error.data)}

`:y.result?U=`Result: ${bt(y.result)}

`:y.error===void 0&&(U=`No result returned.

`)),w.log(`Sending response '${A} - (${y.id})'. Processing request took ${Date.now()-N}ms`,U)}else go("send-response",y)}function il(y){if(!(p===fe.Off||!w))if(S===vr.Text){let A;(p===fe.Verbose||p===fe.Compact)&&y.params&&(A=`Params: ${bt(y.params)}

`),w.log(`Received request '${y.method} - (${y.id})'.`,A)}else go("receive-request",y)}function dm(y){if(!(p===fe.Off||!w||y.method===mf.type.method))if(S===vr.Text){let A;(p===fe.Verbose||p===fe.Compact)&&(y.params?A=`Params: ${bt(y.params)}

`:A=`No parameters provided.

`),w.log(`Received notification '${y.method}'.`,A)}else go("receive-notification",y)}function cw(y,A){if(!(p===fe.Off||!w))if(S===vr.Text){let N;if((p===fe.Verbose||p===fe.Compact)&&(y.error&&y.error.data?N=`Error data: ${bt(y.error.data)}

`:y.result?N=`Result: ${bt(y.result)}

`:y.error===void 0&&(N=`No result returned.

`)),A){let U=y.error?` Request failed: ${y.error.message} (${y.error.code}).`:"";w.log(`Received response '${A.method} - (${y.id})' in ${Date.now()-A.timerStart}ms.${U}`,N)}else w.log(`Received response ${y.id} without active response promise.`,N)}else go("receive-response",y)}function go(y,A){if(!w||p===fe.Off)return;let N={isLSPMessage:!0,type:y,message:A,timestamp:Date.now()};w.log(N)}function Fa(){if(L())throw new ha(Ou.Closed,"Connection is closed.");if(b())throw new ha(Ou.Disposed,"Connection is disposed.")}function uw(){if(dt())throw new ha(Ou.AlreadyListening,"Connection is already listening")}function lw(){if(!dt())throw new Error("Call listen() first.")}function qa(y){return y===void 0?null:y}function fx(y){if(y!==null)return y}function px(y){return y!=null&&!Array.isArray(y)&&typeof y=="object"}function fm(y,A){switch(y){case V.ParameterStructures.auto:return px(A)?fx(A):[qa(A)];case V.ParameterStructures.byName:if(!px(A))throw new Error("Received parameters by name but param is not an object literal.");return fx(A);case V.ParameterStructures.byPosition:return[qa(A)];default:throw new Error(`Unknown parameter structure ${y.toString()}`)}}function mx(y,A){let N,U=y.numberOfParams;switch(U){case 0:N=void 0;break;case 1:N=fm(y.parameterStructures,A[0]);break;default:N=[];for(let we=0;we<A.length&&we<U;we++)N.push(qa(A[we]));if(A.length<U)for(let we=A.length;we<U;we++)N.push(null);break}return N}let yo={sendNotification:(y,...A)=>{Fa();let N,U;if(ze.string(y)){N=y;let ye=A[0],Ye=0,tt=V.ParameterStructures.auto;V.ParameterStructures.is(ye)&&(Ye=1,tt=ye);let ce=A.length,We=ce-Ye;switch(We){case 0:U=void 0;break;case 1:U=fm(tt,A[Ye]);break;default:if(tt===V.ParameterStructures.byName)throw new Error(`Received ${We} parameters for 'by Name' notification parameter structure.`);U=A.slice(Ye,ce).map(he=>qa(he));break}}else{let ye=A;N=y.method,U=mx(y,ye)}let we={jsonrpc:c,method:N,params:U};return gn(we),e.write(we).catch(ye=>{throw i.error("Sending notification failed."),ye})},onNotification:(y,A)=>{Fa();let N;return ze.func(y)?d=y:A&&(ze.string(y)?(N=y,f.set(y,{type:void 0,handler:A})):(N=y.method,f.set(y.method,{type:y,handler:A}))),{dispose:()=>{N!==void 0?f.delete(N):d=void 0}}},onProgress:(y,A,N)=>{if(m.has(A))throw new Error(`Progress handler for token ${A} already registered`);return m.set(A,N),{dispose:()=>{m.delete(A)}}},sendProgress:(y,A,N)=>yo.sendNotification(Nu.type,{token:A,value:N}),onUnhandledProgress:zt.event,sendRequest:(y,...A)=>{Fa(),lw();let N,U,we;if(ze.string(y)){N=y;let ce=A[0],We=A[A.length-1],he=0,ft=V.ParameterStructures.auto;V.ParameterStructures.is(ce)&&(he=1,ft=ce);let qt=A.length;ev.CancellationToken.is(We)&&(qt=qt-1,we=We);let Gr=qt-he;switch(Gr){case 0:U=void 0;break;case 1:U=fm(ft,A[he]);break;default:if(ft===V.ParameterStructures.byName)throw new Error(`Received ${Gr} parameters for 'by Name' request parameter structure.`);U=A.slice(he,qt).map(dw=>qa(dw));break}}else{let ce=A;N=y.method,U=mx(y,ce);let We=y.numberOfParams;we=ev.CancellationToken.is(ce[We])?ce[We]:void 0}let ye=o++,Ye;we&&(Ye=we.onCancellationRequested(()=>{let ce=_.sender.sendCancellation(yo,ye);return ce===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${ye}`),Promise.resolve()):ce.catch(()=>{i.log(`Sending cancellation messages for id ${ye} failed`)})}));let tt={jsonrpc:c,id:ye,method:N,params:U};return Mr(tt),typeof _.sender.enableCancellation=="function"&&_.sender.enableCancellation(tt),new Promise(async(ce,We)=>{let he=Gr=>{ce(Gr),_.sender.cleanup(ye),Ye?.dispose()},ft=Gr=>{We(Gr),_.sender.cleanup(ye),Ye?.dispose()},qt={method:N,timerStart:Date.now(),resolve:he,reject:ft};try{await e.write(tt),C.set(ye,qt)}catch(Gr){throw i.error("Sending request failed."),qt.reject(new V.ResponseError(V.ErrorCodes.MessageWriteError,Gr.message?Gr.message:"Unknown reason")),Gr}})},onRequest:(y,A)=>{Fa();let N=null;return nv.is(y)?(N=void 0,u=y):ze.string(y)?(N=null,A!==void 0&&(N=y,l.set(y,{handler:A,type:void 0}))):A!==void 0&&(N=y.method,l.set(y.method,{type:y,handler:A})),{dispose:()=>{N!==null&&(N!==void 0?l.delete(N):u=void 0)}}},hasPendingResponse:()=>C.size>0,trace:async(y,A,N)=>{let U=!1,we=vr.Text;N!==void 0&&(ze.boolean(N)?U=N:(U=N.sendNotification||!1,we=N.traceFormat||vr.Text)),p=y,S=we,p===fe.Off?w=void 0:w=A,U&&!L()&&!b()&&await yo.sendNotification(iv.type,{value:fe.toString(y)})},onError:Vt.event,onClose:et.event,onUnhandledNotification:dr.event,onDispose:I.event,end:()=>{e.end()},dispose:()=>{if(b())return;Q=Br.Disposed,I.fire(void 0);let y=new V.ResponseError(V.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let A of C.values())A.reject(y);C=new Map,g=new Map,R=new Set,T=new DE.LinkedMap,ze.func(e.dispose)&&e.dispose(),ze.func(t.dispose)&&t.dispose()},listen:()=>{Fa(),uw(),Q=Br.Listening,t.listen(gt)},inspect:()=>{(0,IE.default)().console.log("inspect")}};return yo.onNotification(mf.type,y=>{if(p===fe.Off||!w)return;let A=p===fe.Verbose||p===fe.Compact;w.log(y.message,A?y.verbose:void 0)}),yo.onNotification(Nu.type,y=>{let A=m.get(y.token);A?A(y.value):zt.fire(y)}),yo}J.createMessageConnection=f1});var Tf=$(E=>{"use strict";Object.defineProperty(E,"__esModule",{value:!0});E.ProgressType=E.ProgressToken=E.createMessageConnection=E.NullLogger=E.ConnectionOptions=E.ConnectionStrategy=E.AbstractMessageBuffer=E.WriteableStreamMessageWriter=E.AbstractMessageWriter=E.MessageWriter=E.ReadableStreamMessageReader=E.AbstractMessageReader=E.MessageReader=E.SharedArrayReceiverStrategy=E.SharedArraySenderStrategy=E.CancellationToken=E.CancellationTokenSource=E.Emitter=E.Event=E.Disposable=E.LRUCache=E.Touch=E.LinkedMap=E.ParameterStructures=E.NotificationType9=E.NotificationType8=E.NotificationType7=E.NotificationType6=E.NotificationType5=E.NotificationType4=E.NotificationType3=E.NotificationType2=E.NotificationType1=E.NotificationType0=E.NotificationType=E.ErrorCodes=E.ResponseError=E.RequestType9=E.RequestType8=E.RequestType7=E.RequestType6=E.RequestType5=E.RequestType4=E.RequestType3=E.RequestType2=E.RequestType1=E.RequestType0=E.RequestType=E.Message=E.RAL=void 0;E.MessageStrategy=E.CancellationStrategy=E.CancellationSenderStrategy=E.CancellationReceiverStrategy=E.ConnectionError=E.ConnectionErrors=E.LogTraceNotification=E.SetTraceNotification=E.TraceFormat=E.TraceValues=E.Trace=void 0;var Ae=Fy();Object.defineProperty(E,"Message",{enumerable:!0,get:function(){return Ae.Message}});Object.defineProperty(E,"RequestType",{enumerable:!0,get:function(){return Ae.RequestType}});Object.defineProperty(E,"RequestType0",{enumerable:!0,get:function(){return Ae.RequestType0}});Object.defineProperty(E,"RequestType1",{enumerable:!0,get:function(){return Ae.RequestType1}});Object.defineProperty(E,"RequestType2",{enumerable:!0,get:function(){return Ae.RequestType2}});Object.defineProperty(E,"RequestType3",{enumerable:!0,get:function(){return Ae.RequestType3}});Object.defineProperty(E,"RequestType4",{enumerable:!0,get:function(){return Ae.RequestType4}});Object.defineProperty(E,"RequestType5",{enumerable:!0,get:function(){return Ae.RequestType5}});Object.defineProperty(E,"RequestType6",{enumerable:!0,get:function(){return Ae.RequestType6}});Object.defineProperty(E,"RequestType7",{enumerable:!0,get:function(){return Ae.RequestType7}});Object.defineProperty(E,"RequestType8",{enumerable:!0,get:function(){return Ae.RequestType8}});Object.defineProperty(E,"RequestType9",{enumerable:!0,get:function(){return Ae.RequestType9}});Object.defineProperty(E,"ResponseError",{enumerable:!0,get:function(){return Ae.ResponseError}});Object.defineProperty(E,"ErrorCodes",{enumerable:!0,get:function(){return Ae.ErrorCodes}});Object.defineProperty(E,"NotificationType",{enumerable:!0,get:function(){return Ae.NotificationType}});Object.defineProperty(E,"NotificationType0",{enumerable:!0,get:function(){return Ae.NotificationType0}});Object.defineProperty(E,"NotificationType1",{enumerable:!0,get:function(){return Ae.NotificationType1}});Object.defineProperty(E,"NotificationType2",{enumerable:!0,get:function(){return Ae.NotificationType2}});Object.defineProperty(E,"NotificationType3",{enumerable:!0,get:function(){return Ae.NotificationType3}});Object.defineProperty(E,"NotificationType4",{enumerable:!0,get:function(){return Ae.NotificationType4}});Object.defineProperty(E,"NotificationType5",{enumerable:!0,get:function(){return Ae.NotificationType5}});Object.defineProperty(E,"NotificationType6",{enumerable:!0,get:function(){return Ae.NotificationType6}});Object.defineProperty(E,"NotificationType7",{enumerable:!0,get:function(){return Ae.NotificationType7}});Object.defineProperty(E,"NotificationType8",{enumerable:!0,get:function(){return Ae.NotificationType8}});Object.defineProperty(E,"NotificationType9",{enumerable:!0,get:function(){return Ae.NotificationType9}});Object.defineProperty(E,"ParameterStructures",{enumerable:!0,get:function(){return Ae.ParameterStructures}});var av=jy();Object.defineProperty(E,"LinkedMap",{enumerable:!0,get:function(){return av.LinkedMap}});Object.defineProperty(E,"LRUCache",{enumerable:!0,get:function(){return av.LRUCache}});Object.defineProperty(E,"Touch",{enumerable:!0,get:function(){return av.Touch}});var p1=bE();Object.defineProperty(E,"Disposable",{enumerable:!0,get:function(){return p1.Disposable}});var FE=Zi();Object.defineProperty(E,"Event",{enumerable:!0,get:function(){return FE.Event}});Object.defineProperty(E,"Emitter",{enumerable:!0,get:function(){return FE.Emitter}});var qE=zc();Object.defineProperty(E,"CancellationTokenSource",{enumerable:!0,get:function(){return qE.CancellationTokenSource}});Object.defineProperty(E,"CancellationToken",{enumerable:!0,get:function(){return qE.CancellationToken}});var jE=EE();Object.defineProperty(E,"SharedArraySenderStrategy",{enumerable:!0,get:function(){return jE.SharedArraySenderStrategy}});Object.defineProperty(E,"SharedArrayReceiverStrategy",{enumerable:!0,get:function(){return jE.SharedArrayReceiverStrategy}});var cv=_E();Object.defineProperty(E,"MessageReader",{enumerable:!0,get:function(){return cv.MessageReader}});Object.defineProperty(E,"AbstractMessageReader",{enumerable:!0,get:function(){return cv.AbstractMessageReader}});Object.defineProperty(E,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return cv.ReadableStreamMessageReader}});var uv=NE();Object.defineProperty(E,"MessageWriter",{enumerable:!0,get:function(){return uv.MessageWriter}});Object.defineProperty(E,"AbstractMessageWriter",{enumerable:!0,get:function(){return uv.AbstractMessageWriter}});Object.defineProperty(E,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return uv.WriteableStreamMessageWriter}});var m1=OE();Object.defineProperty(E,"AbstractMessageBuffer",{enumerable:!0,get:function(){return m1.AbstractMessageBuffer}});var kt=LE();Object.defineProperty(E,"ConnectionStrategy",{enumerable:!0,get:function(){return kt.ConnectionStrategy}});Object.defineProperty(E,"ConnectionOptions",{enumerable:!0,get:function(){return kt.ConnectionOptions}});Object.defineProperty(E,"NullLogger",{enumerable:!0,get:function(){return kt.NullLogger}});Object.defineProperty(E,"createMessageConnection",{enumerable:!0,get:function(){return kt.createMessageConnection}});Object.defineProperty(E,"ProgressToken",{enumerable:!0,get:function(){return kt.ProgressToken}});Object.defineProperty(E,"ProgressType",{enumerable:!0,get:function(){return kt.ProgressType}});Object.defineProperty(E,"Trace",{enumerable:!0,get:function(){return kt.Trace}});Object.defineProperty(E,"TraceValues",{enumerable:!0,get:function(){return kt.TraceValues}});Object.defineProperty(E,"TraceFormat",{enumerable:!0,get:function(){return kt.TraceFormat}});Object.defineProperty(E,"SetTraceNotification",{enumerable:!0,get:function(){return kt.SetTraceNotification}});Object.defineProperty(E,"LogTraceNotification",{enumerable:!0,get:function(){return kt.LogTraceNotification}});Object.defineProperty(E,"ConnectionErrors",{enumerable:!0,get:function(){return kt.ConnectionErrors}});Object.defineProperty(E,"ConnectionError",{enumerable:!0,get:function(){return kt.ConnectionError}});Object.defineProperty(E,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return kt.CancellationReceiverStrategy}});Object.defineProperty(E,"CancellationSenderStrategy",{enumerable:!0,get:function(){return kt.CancellationSenderStrategy}});Object.defineProperty(E,"CancellationStrategy",{enumerable:!0,get:function(){return kt.CancellationStrategy}});Object.defineProperty(E,"MessageStrategy",{enumerable:!0,get:function(){return kt.MessageStrategy}});var h1=si();E.RAL=h1.default});var BE=$(pv=>{"use strict";Object.defineProperty(pv,"__esModule",{value:!0});var dn=Tf(),Rf=class t extends dn.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return t.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};Rf.emptyBuffer=new Uint8Array(0);var lv=class{constructor(e){this.socket=e,this._onData=new dn.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,dn.RAL)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),dn.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),dn.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),dn.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},dv=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),dn.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),dn.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),dn.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},g1=new TextEncoder,UE=Object.freeze({messageBuffer:Object.freeze({create:t=>new Rf(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(g1.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new lv(t),asWritableStream:t=>new dv(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function fv(){return UE}(function(t){function e(){dn.RAL.install(UE)}t.install=e})(fv||(fv={}));pv.default=fv});var uo=$(xr=>{"use strict";var y1=xr&&xr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),v1=xr&&xr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&y1(e,t,r)};Object.defineProperty(xr,"__esModule",{value:!0});xr.createMessageConnection=xr.BrowserMessageWriter=xr.BrowserMessageReader=void 0;var x1=BE();x1.default.install();var ga=Tf();v1(Tf(),xr);var mv=class extends ga.AbstractMessageReader{constructor(e){super(),this._onData=new ga.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};xr.BrowserMessageReader=mv;var hv=class extends ga.AbstractMessageWriter{constructor(e){super(),this.port=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.port.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};xr.BrowserMessageWriter=hv;function T1(t,e,r,n){return r===void 0&&(r=ga.NullLogger),ga.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,ga.createMessageConnection)(t,e,r,n)}xr.createMessageConnection=T1});var gv=$((Bee,WE)=>{"use strict";WE.exports=uo()});var Ue=$(sr=>{"use strict";Object.defineProperty(sr,"__esModule",{value:!0});sr.ProtocolNotificationType=sr.ProtocolNotificationType0=sr.ProtocolRequestType=sr.ProtocolRequestType0=sr.RegistrationType=sr.MessageDirection=void 0;var ya=uo(),GE;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(GE||(sr.MessageDirection=GE={}));var yv=class{constructor(e){this.method=e}};sr.RegistrationType=yv;var vv=class extends ya.RequestType0{constructor(e){super(e)}};sr.ProtocolRequestType0=vv;var xv=class extends ya.RequestType{constructor(e){super(e,ya.ParameterStructures.byName)}};sr.ProtocolRequestType=xv;var Tv=class extends ya.NotificationType0{constructor(e){super(e)}};sr.ProtocolNotificationType0=Tv;var Rv=class extends ya.NotificationType{constructor(e){super(e,ya.ParameterStructures.byName)}};sr.ProtocolNotificationType=Rv});var Sf=$(ut=>{"use strict";Object.defineProperty(ut,"__esModule",{value:!0});ut.objectLiteral=ut.typedArray=ut.stringArray=ut.array=ut.func=ut.error=ut.number=ut.string=ut.boolean=void 0;function R1(t){return t===!0||t===!1}ut.boolean=R1;function HE(t){return typeof t=="string"||t instanceof String}ut.string=HE;function S1(t){return typeof t=="number"||t instanceof Number}ut.number=S1;function b1(t){return t instanceof Error}ut.error=b1;function E1(t){return typeof t=="function"}ut.func=E1;function KE(t){return Array.isArray(t)}ut.array=KE;function C1(t){return KE(t)&&t.every(e=>HE(e))}ut.stringArray=C1;function _1(t,e){return Array.isArray(t)&&t.every(e)}ut.typedArray=_1;function A1(t){return t!==null&&typeof t=="object"}ut.objectLiteral=A1});var XE=$(bf=>{"use strict";Object.defineProperty(bf,"__esModule",{value:!0});bf.ImplementationRequest=void 0;var VE=Ue(),zE;(function(t){t.method="textDocument/implementation",t.messageDirection=VE.MessageDirection.clientToServer,t.type=new VE.ProtocolRequestType(t.method)})(zE||(bf.ImplementationRequest=zE={}))});var QE=$(Ef=>{"use strict";Object.defineProperty(Ef,"__esModule",{value:!0});Ef.TypeDefinitionRequest=void 0;var YE=Ue(),JE;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=YE.MessageDirection.clientToServer,t.type=new YE.ProtocolRequestType(t.method)})(JE||(Ef.TypeDefinitionRequest=JE={}))});var tC=$(va=>{"use strict";Object.defineProperty(va,"__esModule",{value:!0});va.DidChangeWorkspaceFoldersNotification=va.WorkspaceFoldersRequest=void 0;var Cf=Ue(),ZE;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=Cf.MessageDirection.serverToClient,t.type=new Cf.ProtocolRequestType0(t.method)})(ZE||(va.WorkspaceFoldersRequest=ZE={}));var eC;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=Cf.MessageDirection.clientToServer,t.type=new Cf.ProtocolNotificationType(t.method)})(eC||(va.DidChangeWorkspaceFoldersNotification=eC={}))});var iC=$(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.ConfigurationRequest=void 0;var rC=Ue(),nC;(function(t){t.method="workspace/configuration",t.messageDirection=rC.MessageDirection.serverToClient,t.type=new rC.ProtocolRequestType(t.method)})(nC||(_f.ConfigurationRequest=nC={}))});var aC=$(xa=>{"use strict";Object.defineProperty(xa,"__esModule",{value:!0});xa.ColorPresentationRequest=xa.DocumentColorRequest=void 0;var Af=Ue(),oC;(function(t){t.method="textDocument/documentColor",t.messageDirection=Af.MessageDirection.clientToServer,t.type=new Af.ProtocolRequestType(t.method)})(oC||(xa.DocumentColorRequest=oC={}));var sC;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=Af.MessageDirection.clientToServer,t.type=new Af.ProtocolRequestType(t.method)})(sC||(xa.ColorPresentationRequest=sC={}))});var lC=$(Ta=>{"use strict";Object.defineProperty(Ta,"__esModule",{value:!0});Ta.FoldingRangeRefreshRequest=Ta.FoldingRangeRequest=void 0;var kf=Ue(),cC;(function(t){t.method="textDocument/foldingRange",t.messageDirection=kf.MessageDirection.clientToServer,t.type=new kf.ProtocolRequestType(t.method)})(cC||(Ta.FoldingRangeRequest=cC={}));var uC;(function(t){t.method="workspace/foldingRange/refresh",t.messageDirection=kf.MessageDirection.serverToClient,t.type=new kf.ProtocolRequestType0(t.method)})(uC||(Ta.FoldingRangeRefreshRequest=uC={}))});var pC=$(wf=>{"use strict";Object.defineProperty(wf,"__esModule",{value:!0});wf.DeclarationRequest=void 0;var dC=Ue(),fC;(function(t){t.method="textDocument/declaration",t.messageDirection=dC.MessageDirection.clientToServer,t.type=new dC.ProtocolRequestType(t.method)})(fC||(wf.DeclarationRequest=fC={}))});var gC=$(Pf=>{"use strict";Object.defineProperty(Pf,"__esModule",{value:!0});Pf.SelectionRangeRequest=void 0;var mC=Ue(),hC;(function(t){t.method="textDocument/selectionRange",t.messageDirection=mC.MessageDirection.clientToServer,t.type=new mC.ProtocolRequestType(t.method)})(hC||(Pf.SelectionRangeRequest=hC={}))});var TC=$(fi=>{"use strict";Object.defineProperty(fi,"__esModule",{value:!0});fi.WorkDoneProgressCancelNotification=fi.WorkDoneProgressCreateRequest=fi.WorkDoneProgress=void 0;var k1=uo(),Nf=Ue(),yC;(function(t){t.type=new k1.ProgressType;function e(r){return r===t.type}t.is=e})(yC||(fi.WorkDoneProgress=yC={}));var vC;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=Nf.MessageDirection.serverToClient,t.type=new Nf.ProtocolRequestType(t.method)})(vC||(fi.WorkDoneProgressCreateRequest=vC={}));var xC;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=Nf.MessageDirection.clientToServer,t.type=new Nf.ProtocolNotificationType(t.method)})(xC||(fi.WorkDoneProgressCancelNotification=xC={}))});var EC=$(pi=>{"use strict";Object.defineProperty(pi,"__esModule",{value:!0});pi.CallHierarchyOutgoingCallsRequest=pi.CallHierarchyIncomingCallsRequest=pi.CallHierarchyPrepareRequest=void 0;var Ra=Ue(),RC;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Ra.MessageDirection.clientToServer,t.type=new Ra.ProtocolRequestType(t.method)})(RC||(pi.CallHierarchyPrepareRequest=RC={}));var SC;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Ra.MessageDirection.clientToServer,t.type=new Ra.ProtocolRequestType(t.method)})(SC||(pi.CallHierarchyIncomingCallsRequest=SC={}));var bC;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Ra.MessageDirection.clientToServer,t.type=new Ra.ProtocolRequestType(t.method)})(bC||(pi.CallHierarchyOutgoingCallsRequest=bC={}))});var PC=$(ar=>{"use strict";Object.defineProperty(ar,"__esModule",{value:!0});ar.SemanticTokensRefreshRequest=ar.SemanticTokensRangeRequest=ar.SemanticTokensDeltaRequest=ar.SemanticTokensRequest=ar.SemanticTokensRegistrationType=ar.TokenFormat=void 0;var Nn=Ue(),CC;(function(t){t.Relative="relative"})(CC||(ar.TokenFormat=CC={}));var Du;(function(t){t.method="textDocument/semanticTokens",t.type=new Nn.RegistrationType(t.method)})(Du||(ar.SemanticTokensRegistrationType=Du={}));var _C;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Nn.MessageDirection.clientToServer,t.type=new Nn.ProtocolRequestType(t.method),t.registrationMethod=Du.method})(_C||(ar.SemanticTokensRequest=_C={}));var AC;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Nn.MessageDirection.clientToServer,t.type=new Nn.ProtocolRequestType(t.method),t.registrationMethod=Du.method})(AC||(ar.SemanticTokensDeltaRequest=AC={}));var kC;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Nn.MessageDirection.clientToServer,t.type=new Nn.ProtocolRequestType(t.method),t.registrationMethod=Du.method})(kC||(ar.SemanticTokensRangeRequest=kC={}));var wC;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Nn.MessageDirection.serverToClient,t.type=new Nn.ProtocolRequestType0(t.method)})(wC||(ar.SemanticTokensRefreshRequest=wC={}))});var IC=$(Of=>{"use strict";Object.defineProperty(Of,"__esModule",{value:!0});Of.ShowDocumentRequest=void 0;var NC=Ue(),OC;(function(t){t.method="window/showDocument",t.messageDirection=NC.MessageDirection.serverToClient,t.type=new NC.ProtocolRequestType(t.method)})(OC||(Of.ShowDocumentRequest=OC={}))});var MC=$(If=>{"use strict";Object.defineProperty(If,"__esModule",{value:!0});If.LinkedEditingRangeRequest=void 0;var DC=Ue(),$C;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=DC.MessageDirection.clientToServer,t.type=new DC.ProtocolRequestType(t.method)})($C||(If.LinkedEditingRangeRequest=$C={}))});var GC=$($t=>{"use strict";Object.defineProperty($t,"__esModule",{value:!0});$t.WillDeleteFilesRequest=$t.DidDeleteFilesNotification=$t.DidRenameFilesNotification=$t.WillRenameFilesRequest=$t.DidCreateFilesNotification=$t.WillCreateFilesRequest=$t.FileOperationPatternKind=void 0;var kr=Ue(),LC;(function(t){t.file="file",t.folder="folder"})(LC||($t.FileOperationPatternKind=LC={}));var FC;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=kr.MessageDirection.clientToServer,t.type=new kr.ProtocolRequestType(t.method)})(FC||($t.WillCreateFilesRequest=FC={}));var qC;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=kr.MessageDirection.clientToServer,t.type=new kr.ProtocolNotificationType(t.method)})(qC||($t.DidCreateFilesNotification=qC={}));var jC;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=kr.MessageDirection.clientToServer,t.type=new kr.ProtocolRequestType(t.method)})(jC||($t.WillRenameFilesRequest=jC={}));var UC;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=kr.MessageDirection.clientToServer,t.type=new kr.ProtocolNotificationType(t.method)})(UC||($t.DidRenameFilesNotification=UC={}));var BC;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=kr.MessageDirection.clientToServer,t.type=new kr.ProtocolNotificationType(t.method)})(BC||($t.DidDeleteFilesNotification=BC={}));var WC;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=kr.MessageDirection.clientToServer,t.type=new kr.ProtocolRequestType(t.method)})(WC||($t.WillDeleteFilesRequest=WC={}))});var XC=$(mi=>{"use strict";Object.defineProperty(mi,"__esModule",{value:!0});mi.MonikerRequest=mi.MonikerKind=mi.UniquenessLevel=void 0;var HC=Ue(),KC;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(KC||(mi.UniquenessLevel=KC={}));var VC;(function(t){t.$import="import",t.$export="export",t.local="local"})(VC||(mi.MonikerKind=VC={}));var zC;(function(t){t.method="textDocument/moniker",t.messageDirection=HC.MessageDirection.clientToServer,t.type=new HC.ProtocolRequestType(t.method)})(zC||(mi.MonikerRequest=zC={}))});var ZC=$(hi=>{"use strict";Object.defineProperty(hi,"__esModule",{value:!0});hi.TypeHierarchySubtypesRequest=hi.TypeHierarchySupertypesRequest=hi.TypeHierarchyPrepareRequest=void 0;var Sa=Ue(),YC;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=Sa.MessageDirection.clientToServer,t.type=new Sa.ProtocolRequestType(t.method)})(YC||(hi.TypeHierarchyPrepareRequest=YC={}));var JC;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=Sa.MessageDirection.clientToServer,t.type=new Sa.ProtocolRequestType(t.method)})(JC||(hi.TypeHierarchySupertypesRequest=JC={}));var QC;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=Sa.MessageDirection.clientToServer,t.type=new Sa.ProtocolRequestType(t.method)})(QC||(hi.TypeHierarchySubtypesRequest=QC={}))});var r_=$(ba=>{"use strict";Object.defineProperty(ba,"__esModule",{value:!0});ba.InlineValueRefreshRequest=ba.InlineValueRequest=void 0;var Df=Ue(),e_;(function(t){t.method="textDocument/inlineValue",t.messageDirection=Df.MessageDirection.clientToServer,t.type=new Df.ProtocolRequestType(t.method)})(e_||(ba.InlineValueRequest=e_={}));var t_;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=Df.MessageDirection.serverToClient,t.type=new Df.ProtocolRequestType0(t.method)})(t_||(ba.InlineValueRefreshRequest=t_={}))});var s_=$(gi=>{"use strict";Object.defineProperty(gi,"__esModule",{value:!0});gi.InlayHintRefreshRequest=gi.InlayHintResolveRequest=gi.InlayHintRequest=void 0;var Ea=Ue(),n_;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Ea.MessageDirection.clientToServer,t.type=new Ea.ProtocolRequestType(t.method)})(n_||(gi.InlayHintRequest=n_={}));var i_;(function(t){t.method="inlayHint/resolve",t.messageDirection=Ea.MessageDirection.clientToServer,t.type=new Ea.ProtocolRequestType(t.method)})(i_||(gi.InlayHintResolveRequest=i_={}));var o_;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Ea.MessageDirection.serverToClient,t.type=new Ea.ProtocolRequestType0(t.method)})(o_||(gi.InlayHintRefreshRequest=o_={}))});var p_=$(wr=>{"use strict";Object.defineProperty(wr,"__esModule",{value:!0});wr.DiagnosticRefreshRequest=wr.WorkspaceDiagnosticRequest=wr.DocumentDiagnosticRequest=wr.DocumentDiagnosticReportKind=wr.DiagnosticServerCancellationData=void 0;var f_=uo(),w1=Sf(),Ca=Ue(),a_;(function(t){function e(r){let n=r;return n&&w1.boolean(n.retriggerRequest)}t.is=e})(a_||(wr.DiagnosticServerCancellationData=a_={}));var c_;(function(t){t.Full="full",t.Unchanged="unchanged"})(c_||(wr.DocumentDiagnosticReportKind=c_={}));var u_;(function(t){t.method="textDocument/diagnostic",t.messageDirection=Ca.MessageDirection.clientToServer,t.type=new Ca.ProtocolRequestType(t.method),t.partialResult=new f_.ProgressType})(u_||(wr.DocumentDiagnosticRequest=u_={}));var l_;(function(t){t.method="workspace/diagnostic",t.messageDirection=Ca.MessageDirection.clientToServer,t.type=new Ca.ProtocolRequestType(t.method),t.partialResult=new f_.ProgressType})(l_||(wr.WorkspaceDiagnosticRequest=l_={}));var d_;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=Ca.MessageDirection.serverToClient,t.type=new Ca.ProtocolRequestType0(t.method)})(d_||(wr.DiagnosticRefreshRequest=d_={}))});var T_=$(Qe=>{"use strict";Object.defineProperty(Qe,"__esModule",{value:!0});Qe.DidCloseNotebookDocumentNotification=Qe.DidSaveNotebookDocumentNotification=Qe.DidChangeNotebookDocumentNotification=Qe.NotebookCellArrayChange=Qe.DidOpenNotebookDocumentNotification=Qe.NotebookDocumentSyncRegistrationType=Qe.NotebookDocument=Qe.NotebookCell=Qe.ExecutionSummary=Qe.NotebookCellKind=void 0;var $u=(zi(),pm(jd)),Wr=Sf(),fn=Ue(),Sv;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(Sv||(Qe.NotebookCellKind=Sv={}));var bv;(function(t){function e(i,o){let s={executionOrder:i};return(o===!0||o===!1)&&(s.success=o),s}t.create=e;function r(i){let o=i;return Wr.objectLiteral(o)&&$u.uinteger.is(o.executionOrder)&&(o.success===void 0||Wr.boolean(o.success))}t.is=r;function n(i,o){return i===o?!0:i==null||o===null||o===void 0?!1:i.executionOrder===o.executionOrder&&i.success===o.success}t.equals=n})(bv||(Qe.ExecutionSummary=bv={}));var $f;(function(t){function e(o,s){return{kind:o,document:s}}t.create=e;function r(o){let s=o;return Wr.objectLiteral(s)&&Sv.is(s.kind)&&$u.DocumentUri.is(s.document)&&(s.metadata===void 0||Wr.objectLiteral(s.metadata))}t.is=r;function n(o,s){let a=new Set;return o.document!==s.document&&a.add("document"),o.kind!==s.kind&&a.add("kind"),o.executionSummary!==s.executionSummary&&a.add("executionSummary"),(o.metadata!==void 0||s.metadata!==void 0)&&!i(o.metadata,s.metadata)&&a.add("metadata"),(o.executionSummary!==void 0||s.executionSummary!==void 0)&&!bv.equals(o.executionSummary,s.executionSummary)&&a.add("executionSummary"),a}t.diff=n;function i(o,s){if(o===s)return!0;if(o==null||s===null||s===void 0||typeof o!=typeof s||typeof o!="object")return!1;let a=Array.isArray(o),c=Array.isArray(s);if(a!==c)return!1;if(a&&c){if(o.length!==s.length)return!1;for(let u=0;u<o.length;u++)if(!i(o[u],s[u]))return!1}if(Wr.objectLiteral(o)&&Wr.objectLiteral(s)){let u=Object.keys(o),l=Object.keys(s);if(u.length!==l.length||(u.sort(),l.sort(),!i(u,l)))return!1;for(let d=0;d<u.length;d++){let f=u[d];if(!i(o[f],s[f]))return!1}}return!0}})($f||(Qe.NotebookCell=$f={}));var m_;(function(t){function e(n,i,o,s){return{uri:n,notebookType:i,version:o,cells:s}}t.create=e;function r(n){let i=n;return Wr.objectLiteral(i)&&Wr.string(i.uri)&&$u.integer.is(i.version)&&Wr.typedArray(i.cells,$f.is)}t.is=r})(m_||(Qe.NotebookDocument=m_={}));var _a;(function(t){t.method="notebookDocument/sync",t.messageDirection=fn.MessageDirection.clientToServer,t.type=new fn.RegistrationType(t.method)})(_a||(Qe.NotebookDocumentSyncRegistrationType=_a={}));var h_;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=fn.MessageDirection.clientToServer,t.type=new fn.ProtocolNotificationType(t.method),t.registrationMethod=_a.method})(h_||(Qe.DidOpenNotebookDocumentNotification=h_={}));var g_;(function(t){function e(n){let i=n;return Wr.objectLiteral(i)&&$u.uinteger.is(i.start)&&$u.uinteger.is(i.deleteCount)&&(i.cells===void 0||Wr.typedArray(i.cells,$f.is))}t.is=e;function r(n,i,o){let s={start:n,deleteCount:i};return o!==void 0&&(s.cells=o),s}t.create=r})(g_||(Qe.NotebookCellArrayChange=g_={}));var y_;(function(t){t.method="notebookDocument/didChange",t.messageDirection=fn.MessageDirection.clientToServer,t.type=new fn.ProtocolNotificationType(t.method),t.registrationMethod=_a.method})(y_||(Qe.DidChangeNotebookDocumentNotification=y_={}));var v_;(function(t){t.method="notebookDocument/didSave",t.messageDirection=fn.MessageDirection.clientToServer,t.type=new fn.ProtocolNotificationType(t.method),t.registrationMethod=_a.method})(v_||(Qe.DidSaveNotebookDocumentNotification=v_={}));var x_;(function(t){t.method="notebookDocument/didClose",t.messageDirection=fn.MessageDirection.clientToServer,t.type=new fn.ProtocolNotificationType(t.method),t.registrationMethod=_a.method})(x_||(Qe.DidCloseNotebookDocumentNotification=x_={}))});var b_=$(Mf=>{"use strict";Object.defineProperty(Mf,"__esModule",{value:!0});Mf.InlineCompletionRequest=void 0;var R_=Ue(),S_;(function(t){t.method="textDocument/inlineCompletion",t.messageDirection=R_.MessageDirection.clientToServer,t.type=new R_.ProtocolRequestType(t.method)})(S_||(Mf.InlineCompletionRequest=S_={}))});var MA=$(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.WorkspaceSymbolRequest=h.CodeActionResolveRequest=h.CodeActionRequest=h.DocumentSymbolRequest=h.DocumentHighlightRequest=h.ReferencesRequest=h.DefinitionRequest=h.SignatureHelpRequest=h.SignatureHelpTriggerKind=h.HoverRequest=h.CompletionResolveRequest=h.CompletionRequest=h.CompletionTriggerKind=h.PublishDiagnosticsNotification=h.WatchKind=h.RelativePattern=h.FileChangeType=h.DidChangeWatchedFilesNotification=h.WillSaveTextDocumentWaitUntilRequest=h.WillSaveTextDocumentNotification=h.TextDocumentSaveReason=h.DidSaveTextDocumentNotification=h.DidCloseTextDocumentNotification=h.DidChangeTextDocumentNotification=h.TextDocumentContentChangeEvent=h.DidOpenTextDocumentNotification=h.TextDocumentSyncKind=h.TelemetryEventNotification=h.LogMessageNotification=h.ShowMessageRequest=h.ShowMessageNotification=h.MessageType=h.DidChangeConfigurationNotification=h.ExitNotification=h.ShutdownRequest=h.InitializedNotification=h.InitializeErrorCodes=h.InitializeRequest=h.WorkDoneProgressOptions=h.TextDocumentRegistrationOptions=h.StaticRegistrationOptions=h.PositionEncodingKind=h.FailureHandlingKind=h.ResourceOperationKind=h.UnregistrationRequest=h.RegistrationRequest=h.DocumentSelector=h.NotebookCellTextDocumentFilter=h.NotebookDocumentFilter=h.TextDocumentFilter=void 0;h.MonikerRequest=h.MonikerKind=h.UniquenessLevel=h.WillDeleteFilesRequest=h.DidDeleteFilesNotification=h.WillRenameFilesRequest=h.DidRenameFilesNotification=h.WillCreateFilesRequest=h.DidCreateFilesNotification=h.FileOperationPatternKind=h.LinkedEditingRangeRequest=h.ShowDocumentRequest=h.SemanticTokensRegistrationType=h.SemanticTokensRefreshRequest=h.SemanticTokensRangeRequest=h.SemanticTokensDeltaRequest=h.SemanticTokensRequest=h.TokenFormat=h.CallHierarchyPrepareRequest=h.CallHierarchyOutgoingCallsRequest=h.CallHierarchyIncomingCallsRequest=h.WorkDoneProgressCancelNotification=h.WorkDoneProgressCreateRequest=h.WorkDoneProgress=h.SelectionRangeRequest=h.DeclarationRequest=h.FoldingRangeRefreshRequest=h.FoldingRangeRequest=h.ColorPresentationRequest=h.DocumentColorRequest=h.ConfigurationRequest=h.DidChangeWorkspaceFoldersNotification=h.WorkspaceFoldersRequest=h.TypeDefinitionRequest=h.ImplementationRequest=h.ApplyWorkspaceEditRequest=h.ExecuteCommandRequest=h.PrepareRenameRequest=h.RenameRequest=h.PrepareSupportDefaultBehavior=h.DocumentOnTypeFormattingRequest=h.DocumentRangesFormattingRequest=h.DocumentRangeFormattingRequest=h.DocumentFormattingRequest=h.DocumentLinkResolveRequest=h.DocumentLinkRequest=h.CodeLensRefreshRequest=h.CodeLensResolveRequest=h.CodeLensRequest=h.WorkspaceSymbolResolveRequest=void 0;h.InlineCompletionRequest=h.DidCloseNotebookDocumentNotification=h.DidSaveNotebookDocumentNotification=h.DidChangeNotebookDocumentNotification=h.NotebookCellArrayChange=h.DidOpenNotebookDocumentNotification=h.NotebookDocumentSyncRegistrationType=h.NotebookDocument=h.NotebookCell=h.ExecutionSummary=h.NotebookCellKind=h.DiagnosticRefreshRequest=h.WorkspaceDiagnosticRequest=h.DocumentDiagnosticRequest=h.DocumentDiagnosticReportKind=h.DiagnosticServerCancellationData=h.InlayHintRefreshRequest=h.InlayHintResolveRequest=h.InlayHintRequest=h.InlineValueRefreshRequest=h.InlineValueRequest=h.TypeHierarchySupertypesRequest=h.TypeHierarchySubtypesRequest=h.TypeHierarchyPrepareRequest=void 0;var k=Ue(),E_=(zi(),pm(jd)),Rt=Sf(),P1=XE();Object.defineProperty(h,"ImplementationRequest",{enumerable:!0,get:function(){return P1.ImplementationRequest}});var N1=QE();Object.defineProperty(h,"TypeDefinitionRequest",{enumerable:!0,get:function(){return N1.TypeDefinitionRequest}});var OA=tC();Object.defineProperty(h,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return OA.WorkspaceFoldersRequest}});Object.defineProperty(h,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return OA.DidChangeWorkspaceFoldersNotification}});var O1=iC();Object.defineProperty(h,"ConfigurationRequest",{enumerable:!0,get:function(){return O1.ConfigurationRequest}});var IA=aC();Object.defineProperty(h,"DocumentColorRequest",{enumerable:!0,get:function(){return IA.DocumentColorRequest}});Object.defineProperty(h,"ColorPresentationRequest",{enumerable:!0,get:function(){return IA.ColorPresentationRequest}});var DA=lC();Object.defineProperty(h,"FoldingRangeRequest",{enumerable:!0,get:function(){return DA.FoldingRangeRequest}});Object.defineProperty(h,"FoldingRangeRefreshRequest",{enumerable:!0,get:function(){return DA.FoldingRangeRefreshRequest}});var I1=pC();Object.defineProperty(h,"DeclarationRequest",{enumerable:!0,get:function(){return I1.DeclarationRequest}});var D1=gC();Object.defineProperty(h,"SelectionRangeRequest",{enumerable:!0,get:function(){return D1.SelectionRangeRequest}});var kv=TC();Object.defineProperty(h,"WorkDoneProgress",{enumerable:!0,get:function(){return kv.WorkDoneProgress}});Object.defineProperty(h,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return kv.WorkDoneProgressCreateRequest}});Object.defineProperty(h,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return kv.WorkDoneProgressCancelNotification}});var wv=EC();Object.defineProperty(h,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return wv.CallHierarchyIncomingCallsRequest}});Object.defineProperty(h,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return wv.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(h,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return wv.CallHierarchyPrepareRequest}});var Aa=PC();Object.defineProperty(h,"TokenFormat",{enumerable:!0,get:function(){return Aa.TokenFormat}});Object.defineProperty(h,"SemanticTokensRequest",{enumerable:!0,get:function(){return Aa.SemanticTokensRequest}});Object.defineProperty(h,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Aa.SemanticTokensDeltaRequest}});Object.defineProperty(h,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Aa.SemanticTokensRangeRequest}});Object.defineProperty(h,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Aa.SemanticTokensRefreshRequest}});Object.defineProperty(h,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Aa.SemanticTokensRegistrationType}});var $1=IC();Object.defineProperty(h,"ShowDocumentRequest",{enumerable:!0,get:function(){return $1.ShowDocumentRequest}});var M1=MC();Object.defineProperty(h,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return M1.LinkedEditingRangeRequest}});var lo=GC();Object.defineProperty(h,"FileOperationPatternKind",{enumerable:!0,get:function(){return lo.FileOperationPatternKind}});Object.defineProperty(h,"DidCreateFilesNotification",{enumerable:!0,get:function(){return lo.DidCreateFilesNotification}});Object.defineProperty(h,"WillCreateFilesRequest",{enumerable:!0,get:function(){return lo.WillCreateFilesRequest}});Object.defineProperty(h,"DidRenameFilesNotification",{enumerable:!0,get:function(){return lo.DidRenameFilesNotification}});Object.defineProperty(h,"WillRenameFilesRequest",{enumerable:!0,get:function(){return lo.WillRenameFilesRequest}});Object.defineProperty(h,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return lo.DidDeleteFilesNotification}});Object.defineProperty(h,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return lo.WillDeleteFilesRequest}});var Pv=XC();Object.defineProperty(h,"UniquenessLevel",{enumerable:!0,get:function(){return Pv.UniquenessLevel}});Object.defineProperty(h,"MonikerKind",{enumerable:!0,get:function(){return Pv.MonikerKind}});Object.defineProperty(h,"MonikerRequest",{enumerable:!0,get:function(){return Pv.MonikerRequest}});var Nv=ZC();Object.defineProperty(h,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return Nv.TypeHierarchyPrepareRequest}});Object.defineProperty(h,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return Nv.TypeHierarchySubtypesRequest}});Object.defineProperty(h,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return Nv.TypeHierarchySupertypesRequest}});var $A=r_();Object.defineProperty(h,"InlineValueRequest",{enumerable:!0,get:function(){return $A.InlineValueRequest}});Object.defineProperty(h,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return $A.InlineValueRefreshRequest}});var Ov=s_();Object.defineProperty(h,"InlayHintRequest",{enumerable:!0,get:function(){return Ov.InlayHintRequest}});Object.defineProperty(h,"InlayHintResolveRequest",{enumerable:!0,get:function(){return Ov.InlayHintResolveRequest}});Object.defineProperty(h,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return Ov.InlayHintRefreshRequest}});var Mu=p_();Object.defineProperty(h,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Mu.DiagnosticServerCancellationData}});Object.defineProperty(h,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Mu.DocumentDiagnosticReportKind}});Object.defineProperty(h,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Mu.DocumentDiagnosticRequest}});Object.defineProperty(h,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Mu.WorkspaceDiagnosticRequest}});Object.defineProperty(h,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Mu.DiagnosticRefreshRequest}});var pn=T_();Object.defineProperty(h,"NotebookCellKind",{enumerable:!0,get:function(){return pn.NotebookCellKind}});Object.defineProperty(h,"ExecutionSummary",{enumerable:!0,get:function(){return pn.ExecutionSummary}});Object.defineProperty(h,"NotebookCell",{enumerable:!0,get:function(){return pn.NotebookCell}});Object.defineProperty(h,"NotebookDocument",{enumerable:!0,get:function(){return pn.NotebookDocument}});Object.defineProperty(h,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return pn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(h,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return pn.DidOpenNotebookDocumentNotification}});Object.defineProperty(h,"NotebookCellArrayChange",{enumerable:!0,get:function(){return pn.NotebookCellArrayChange}});Object.defineProperty(h,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return pn.DidChangeNotebookDocumentNotification}});Object.defineProperty(h,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return pn.DidSaveNotebookDocumentNotification}});Object.defineProperty(h,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return pn.DidCloseNotebookDocumentNotification}});var L1=b_();Object.defineProperty(h,"InlineCompletionRequest",{enumerable:!0,get:function(){return L1.InlineCompletionRequest}});var Ev;(function(t){function e(r){let n=r;return Rt.string(n)||Rt.string(n.language)||Rt.string(n.scheme)||Rt.string(n.pattern)}t.is=e})(Ev||(h.TextDocumentFilter=Ev={}));var Cv;(function(t){function e(r){let n=r;return Rt.objectLiteral(n)&&(Rt.string(n.notebookType)||Rt.string(n.scheme)||Rt.string(n.pattern))}t.is=e})(Cv||(h.NotebookDocumentFilter=Cv={}));var _v;(function(t){function e(r){let n=r;return Rt.objectLiteral(n)&&(Rt.string(n.notebook)||Cv.is(n.notebook))&&(n.language===void 0||Rt.string(n.language))}t.is=e})(_v||(h.NotebookCellTextDocumentFilter=_v={}));var Av;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Rt.string(n)&&!Ev.is(n)&&!_v.is(n))return!1;return!0}t.is=e})(Av||(h.DocumentSelector=Av={}));var C_;(function(t){t.method="client/registerCapability",t.messageDirection=k.MessageDirection.serverToClient,t.type=new k.ProtocolRequestType(t.method)})(C_||(h.RegistrationRequest=C_={}));var __;(function(t){t.method="client/unregisterCapability",t.messageDirection=k.MessageDirection.serverToClient,t.type=new k.ProtocolRequestType(t.method)})(__||(h.UnregistrationRequest=__={}));var A_;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(A_||(h.ResourceOperationKind=A_={}));var k_;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(k_||(h.FailureHandlingKind=k_={}));var w_;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(w_||(h.PositionEncodingKind=w_={}));var P_;(function(t){function e(r){let n=r;return n&&Rt.string(n.id)&&n.id.length>0}t.hasId=e})(P_||(h.StaticRegistrationOptions=P_={}));var N_;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||Av.is(n.documentSelector))}t.is=e})(N_||(h.TextDocumentRegistrationOptions=N_={}));var O_;(function(t){function e(n){let i=n;return Rt.objectLiteral(i)&&(i.workDoneProgress===void 0||Rt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Rt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(O_||(h.WorkDoneProgressOptions=O_={}));var I_;(function(t){t.method="initialize",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(I_||(h.InitializeRequest=I_={}));var D_;(function(t){t.unknownProtocolVersion=1})(D_||(h.InitializeErrorCodes=D_={}));var $_;(function(t){t.method="initialized",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolNotificationType(t.method)})($_||(h.InitializedNotification=$_={}));var M_;(function(t){t.method="shutdown",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType0(t.method)})(M_||(h.ShutdownRequest=M_={}));var L_;(function(t){t.method="exit",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolNotificationType0(t.method)})(L_||(h.ExitNotification=L_={}));var F_;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolNotificationType(t.method)})(F_||(h.DidChangeConfigurationNotification=F_={}));var q_;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4,t.Debug=5})(q_||(h.MessageType=q_={}));var j_;(function(t){t.method="window/showMessage",t.messageDirection=k.MessageDirection.serverToClient,t.type=new k.ProtocolNotificationType(t.method)})(j_||(h.ShowMessageNotification=j_={}));var U_;(function(t){t.method="window/showMessageRequest",t.messageDirection=k.MessageDirection.serverToClient,t.type=new k.ProtocolRequestType(t.method)})(U_||(h.ShowMessageRequest=U_={}));var B_;(function(t){t.method="window/logMessage",t.messageDirection=k.MessageDirection.serverToClient,t.type=new k.ProtocolNotificationType(t.method)})(B_||(h.LogMessageNotification=B_={}));var W_;(function(t){t.method="telemetry/event",t.messageDirection=k.MessageDirection.serverToClient,t.type=new k.ProtocolNotificationType(t.method)})(W_||(h.TelemetryEventNotification=W_={}));var G_;(function(t){t.None=0,t.Full=1,t.Incremental=2})(G_||(h.TextDocumentSyncKind=G_={}));var H_;(function(t){t.method="textDocument/didOpen",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolNotificationType(t.method)})(H_||(h.DidOpenTextDocumentNotification=H_={}));var K_;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(K_||(h.TextDocumentContentChangeEvent=K_={}));var V_;(function(t){t.method="textDocument/didChange",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolNotificationType(t.method)})(V_||(h.DidChangeTextDocumentNotification=V_={}));var z_;(function(t){t.method="textDocument/didClose",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolNotificationType(t.method)})(z_||(h.DidCloseTextDocumentNotification=z_={}));var X_;(function(t){t.method="textDocument/didSave",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolNotificationType(t.method)})(X_||(h.DidSaveTextDocumentNotification=X_={}));var Y_;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(Y_||(h.TextDocumentSaveReason=Y_={}));var J_;(function(t){t.method="textDocument/willSave",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolNotificationType(t.method)})(J_||(h.WillSaveTextDocumentNotification=J_={}));var Q_;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(Q_||(h.WillSaveTextDocumentWaitUntilRequest=Q_={}));var Z_;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolNotificationType(t.method)})(Z_||(h.DidChangeWatchedFilesNotification=Z_={}));var eA;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(eA||(h.FileChangeType=eA={}));var tA;(function(t){function e(r){let n=r;return Rt.objectLiteral(n)&&(E_.URI.is(n.baseUri)||E_.WorkspaceFolder.is(n.baseUri))&&Rt.string(n.pattern)}t.is=e})(tA||(h.RelativePattern=tA={}));var rA;(function(t){t.Create=1,t.Change=2,t.Delete=4})(rA||(h.WatchKind=rA={}));var nA;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=k.MessageDirection.serverToClient,t.type=new k.ProtocolNotificationType(t.method)})(nA||(h.PublishDiagnosticsNotification=nA={}));var iA;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(iA||(h.CompletionTriggerKind=iA={}));var oA;(function(t){t.method="textDocument/completion",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(oA||(h.CompletionRequest=oA={}));var sA;(function(t){t.method="completionItem/resolve",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(sA||(h.CompletionResolveRequest=sA={}));var aA;(function(t){t.method="textDocument/hover",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(aA||(h.HoverRequest=aA={}));var cA;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(cA||(h.SignatureHelpTriggerKind=cA={}));var uA;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(uA||(h.SignatureHelpRequest=uA={}));var lA;(function(t){t.method="textDocument/definition",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(lA||(h.DefinitionRequest=lA={}));var dA;(function(t){t.method="textDocument/references",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(dA||(h.ReferencesRequest=dA={}));var fA;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(fA||(h.DocumentHighlightRequest=fA={}));var pA;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(pA||(h.DocumentSymbolRequest=pA={}));var mA;(function(t){t.method="textDocument/codeAction",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(mA||(h.CodeActionRequest=mA={}));var hA;(function(t){t.method="codeAction/resolve",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(hA||(h.CodeActionResolveRequest=hA={}));var gA;(function(t){t.method="workspace/symbol",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(gA||(h.WorkspaceSymbolRequest=gA={}));var yA;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(yA||(h.WorkspaceSymbolResolveRequest=yA={}));var vA;(function(t){t.method="textDocument/codeLens",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(vA||(h.CodeLensRequest=vA={}));var xA;(function(t){t.method="codeLens/resolve",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(xA||(h.CodeLensResolveRequest=xA={}));var TA;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=k.MessageDirection.serverToClient,t.type=new k.ProtocolRequestType0(t.method)})(TA||(h.CodeLensRefreshRequest=TA={}));var RA;(function(t){t.method="textDocument/documentLink",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(RA||(h.DocumentLinkRequest=RA={}));var SA;(function(t){t.method="documentLink/resolve",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(SA||(h.DocumentLinkResolveRequest=SA={}));var bA;(function(t){t.method="textDocument/formatting",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(bA||(h.DocumentFormattingRequest=bA={}));var EA;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(EA||(h.DocumentRangeFormattingRequest=EA={}));var CA;(function(t){t.method="textDocument/rangesFormatting",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(CA||(h.DocumentRangesFormattingRequest=CA={}));var _A;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(_A||(h.DocumentOnTypeFormattingRequest=_A={}));var AA;(function(t){t.Identifier=1})(AA||(h.PrepareSupportDefaultBehavior=AA={}));var kA;(function(t){t.method="textDocument/rename",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(kA||(h.RenameRequest=kA={}));var wA;(function(t){t.method="textDocument/prepareRename",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(wA||(h.PrepareRenameRequest=wA={}));var PA;(function(t){t.method="workspace/executeCommand",t.messageDirection=k.MessageDirection.clientToServer,t.type=new k.ProtocolRequestType(t.method)})(PA||(h.ExecuteCommandRequest=PA={}));var NA;(function(t){t.method="workspace/applyEdit",t.messageDirection=k.MessageDirection.serverToClient,t.type=new k.ProtocolRequestType("workspace/applyEdit")})(NA||(h.ApplyWorkspaceEditRequest=NA={}))});var FA=$(Lf=>{"use strict";Object.defineProperty(Lf,"__esModule",{value:!0});Lf.createProtocolConnection=void 0;var LA=uo();function F1(t,e,r,n){return LA.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,LA.createMessageConnection)(t,e,r,n)}Lf.createProtocolConnection=F1});var jA=$(cr=>{"use strict";var q1=cr&&cr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Ff=cr&&cr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&q1(e,t,r)};Object.defineProperty(cr,"__esModule",{value:!0});cr.LSPErrorCodes=cr.createProtocolConnection=void 0;Ff(uo(),cr);Ff((zi(),pm(jd)),cr);Ff(Ue(),cr);Ff(MA(),cr);var j1=FA();Object.defineProperty(cr,"createProtocolConnection",{enumerable:!0,get:function(){return j1.createProtocolConnection}});var qA;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(qA||(cr.LSPErrorCodes=qA={}))});var Ze=$(mn=>{"use strict";var U1=mn&&mn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),UA=mn&&mn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&U1(e,t,r)};Object.defineProperty(mn,"__esModule",{value:!0});mn.createProtocolConnection=void 0;var B1=gv();UA(gv(),mn);UA(jA(),mn);function W1(t,e,r,n){return(0,B1.createMessageConnection)(t,e,r,n)}mn.createProtocolConnection=W1});var Dv=$(yi=>{"use strict";Object.defineProperty(yi,"__esModule",{value:!0});yi.SemanticTokensBuilder=yi.SemanticTokensDiff=yi.SemanticTokensFeature=void 0;var qf=Ze(),G1=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(qf.SemanticTokensRefreshRequest.type),on:e=>{let r=qf.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=qf.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=qf.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};yi.SemanticTokensFeature=G1;var jf=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,o=r-1;for(;i>=n&&o>=n&&this.originalSequence[i]===this.modifiedSequence[o];)i--,o--;(i<n||o<n)&&(i++,o++);let s=i-n+1,a=this.modifiedSequence.slice(n,o+1);return a.length===1&&a[0]===this.originalSequence[i]?[{start:n,deleteCount:s-1}]:[{start:n,deleteCount:s,data:a}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};yi.SemanticTokensDiff=jf;var Iv=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,o){let s=e,a=r;this._dataLen>0&&(s-=this._prevLine,s===0&&(a-=this._prevChar)),this._data[this._dataLen++]=s,this._data[this._dataLen++]=a,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=o,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new jf(this._prevData,this._data).computeDiff()}:this.build()}};yi.SemanticTokensBuilder=Iv});var BA=$(Uf=>{"use strict";Object.defineProperty(Uf,"__esModule",{value:!0});Uf.InlineCompletionFeature=void 0;var H1=Ze(),K1=t=>class extends t{get inlineCompletion(){return{on:e=>this.connection.onRequest(H1.InlineCompletionRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};Uf.InlineCompletionFeature=K1});var Mv=$(Bf=>{"use strict";Object.defineProperty(Bf,"__esModule",{value:!0});Bf.TextDocuments=void 0;var fo=Ze(),$v=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new fo.Emitter,this._onDidOpen=new fo.Emitter,this._onDidClose=new fo.Emitter,this._onDidSave=new fo.Emitter,this._onWillSave=new fo.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=fo.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,o);let s=Object.freeze({document:o});this._onDidOpen.fire(s),this._onDidChangeContent.fire(s)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:s}=i;if(s==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=this._syncedDocuments.get(i.uri);a!==void 0&&(a=this._configuration.update(a,o,s),this._syncedDocuments.set(i.uri,a),this._onDidChangeContent.fire(Object.freeze({document:a})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(n.textDocument.uri);return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),fo.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};Bf.TextDocuments=$v});var Fv=$(ka=>{"use strict";Object.defineProperty(ka,"__esModule",{value:!0});ka.NotebookDocuments=ka.NotebookSyncFeature=void 0;var Pr=Ze(),WA=Mv(),V1=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Pr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Pr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Pr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Pr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};ka.NotebookSyncFeature=V1;var Wf=class t{onDidOpenTextDocument(e){return this.openHandler=e,Pr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Pr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Pr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return t.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return t.NULL_DISPOSE}onDidSaveTextDocument(){return t.NULL_DISPOSE}};Wf.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var Lv=class{constructor(e){e instanceof WA.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new WA.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Pr.Emitter,this._onDidChange=new Pr.Emitter,this._onDidSave=new Pr.Emitter,this._onDidClose=new Pr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new Wf,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let o of i.cellTextDocuments)r.openTextDocument({textDocument:o});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o===void 0)return;o.version=i.notebookDocument.version;let s=o.metadata,a=!1,c=i.change;c.metadata!==void 0&&(a=!0,o.metadata=c.metadata);let u=[],l=[],d=[],f=[];if(c.cells!==void 0){let R=c.cells;if(R.structure!==void 0){let g=R.structure.array;if(o.cells.splice(g.start,g.deleteCount,...g.cells!==void 0?g.cells:[]),R.structure.didOpen!==void 0)for(let p of R.structure.didOpen)r.openTextDocument({textDocument:p}),u.push(p.uri);if(R.structure.didClose)for(let p of R.structure.didClose)r.closeTextDocument({textDocument:p}),l.push(p.uri)}if(R.data!==void 0){let g=new Map(R.data.map(p=>[p.document,p]));for(let p=0;p<=o.cells.length;p++){let S=g.get(o.cells[p].document);if(S!==void 0){let w=o.cells.splice(p,1,S);if(d.push({old:w[0],new:S}),g.delete(S.document),g.size===0)break}}}if(R.textContent!==void 0)for(let g of R.textContent)r.changeTextDocument({textDocument:g.document,contentChanges:g.changes}),f.push(g.document.uri)}this.updateCellMap(o);let m={notebookDocument:o};a&&(m.metadata={old:s,new:o.metadata});let v=[];for(let R of u)v.push(this.getNotebookCell(R));let T=[];for(let R of l)T.push(this.getNotebookCell(R));let C=[];for(let R of f)C.push(this.getNotebookCell(R));(v.length>0||T.length>0||d.length>0||C.length>0)&&(m.cells={added:v,removed:T,changed:{data:d,textContent:C}}),(m.metadata!==void 0||m.cells!==void 0)&&this._onDidChange.fire(m)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o!==void 0){this._onDidClose.fire(o);for(let s of i.cellTextDocuments)r.closeTextDocument({textDocument:s});this.notebookDocuments.delete(i.notebookDocument.uri);for(let s of o.cells)this.notebookCellMap.delete(s.document)}})),Pr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};ka.NotebookDocuments=Lv});var qv=$(lt=>{"use strict";Object.defineProperty(lt,"__esModule",{value:!0});lt.thenable=lt.typedArray=lt.stringArray=lt.array=lt.func=lt.error=lt.number=lt.string=lt.boolean=void 0;function z1(t){return t===!0||t===!1}lt.boolean=z1;function GA(t){return typeof t=="string"||t instanceof String}lt.string=GA;function X1(t){return typeof t=="number"||t instanceof Number}lt.number=X1;function Y1(t){return t instanceof Error}lt.error=Y1;function HA(t){return typeof t=="function"}lt.func=HA;function KA(t){return Array.isArray(t)}lt.array=KA;function J1(t){return KA(t)&&t.every(e=>GA(e))}lt.stringArray=J1;function Q1(t,e){return Array.isArray(t)&&t.every(e)}lt.typedArray=Q1;function Z1(t){return t&&HA(t.then)}lt.thenable=Z1});var jv=$(Nr=>{"use strict";Object.defineProperty(Nr,"__esModule",{value:!0});Nr.generateUuid=Nr.parse=Nr.isUUID=Nr.v4=Nr.empty=void 0;var Lu=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},Fu=class t extends Lu{static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return t._oneOf(t._chars)}constructor(){super([t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-","4",t._randomHex(),t._randomHex(),t._randomHex(),"-",t._oneOf(t._timeHighBits),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex()].join(""))}};Fu._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];Fu._timeHighBits=["8","9","a","b"];Nr.empty=new Lu("00000000-0000-0000-0000-000000000000");function VA(){return new Fu}Nr.v4=VA;var eq=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function zA(t){return eq.test(t)}Nr.isUUID=zA;function tq(t){if(!zA(t))throw new Error("invalid uuid");return new Lu(t)}Nr.parse=tq;function rq(){return VA().asHex()}Nr.generateUuid=rq});var XA=$(xi=>{"use strict";Object.defineProperty(xi,"__esModule",{value:!0});xi.attachPartialResult=xi.ProgressFeature=xi.attachWorkDone=void 0;var vi=Ze(),nq=jv(),po=class t{constructor(e,r){this._connection=e,this._token=r,t.Instances.set(this._token,this)}begin(e,r,n,i){let o={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(vi.WorkDoneProgress.type,this._token,o)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(vi.WorkDoneProgress.type,this._token,n)}done(){t.Instances.delete(this._token),this._connection.sendProgress(vi.WorkDoneProgress.type,this._token,{kind:"end"})}};po.Instances=new Map;var Gf=class extends po{constructor(e,r){super(e,r),this._source=new vi.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},qu=class{constructor(){}begin(){}report(){}done(){}},Hf=class extends qu{constructor(){super(),this._source=new vi.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function iq(t,e){if(e===void 0||e.workDoneToken===void 0)return new qu;let r=e.workDoneToken;return delete e.workDoneToken,new po(t,r)}xi.attachWorkDone=iq;var oq=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(vi.WorkDoneProgressCancelNotification.type,r=>{let n=po.Instances.get(r.token);(n instanceof Gf||n instanceof Hf)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new qu:new po(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,nq.generateUuid)();return this.connection.sendRequest(vi.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new Gf(this.connection,e))}else return Promise.resolve(new Hf)}};xi.ProgressFeature=oq;var Uv;(function(t){t.type=new vi.ProgressType})(Uv||(Uv={}));var Bv=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(Uv.type,this._token,e)}};function sq(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new Bv(t,r)}xi.attachPartialResult=sq});var YA=$(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});Kf.ConfigurationFeature=void 0;var aq=Ze(),cq=qv(),uq=t=>class extends t{getConfiguration(e){return e?cq.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(aq.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};Kf.ConfigurationFeature=uq});var JA=$(zf=>{"use strict";Object.defineProperty(zf,"__esModule",{value:!0});zf.WorkspaceFoldersFeature=void 0;var Vf=Ze(),lq=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new Vf.Emitter,this.connection.onNotification(Vf.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(Vf.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(Vf.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};zf.WorkspaceFoldersFeature=lq});var QA=$(Xf=>{"use strict";Object.defineProperty(Xf,"__esModule",{value:!0});Xf.CallHierarchyFeature=void 0;var Wv=Ze(),dq=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(Wv.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=Wv.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=Wv.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Xf.CallHierarchyFeature=dq});var ZA=$(Yf=>{"use strict";Object.defineProperty(Yf,"__esModule",{value:!0});Yf.ShowDocumentFeature=void 0;var fq=Ze(),pq=t=>class extends t{showDocument(e){return this.connection.sendRequest(fq.ShowDocumentRequest.type,e)}};Yf.ShowDocumentFeature=pq});var ek=$(Jf=>{"use strict";Object.defineProperty(Jf,"__esModule",{value:!0});Jf.FileOperationsFeature=void 0;var wa=Ze(),mq=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(wa.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(wa.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(wa.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(wa.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(wa.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(wa.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};Jf.FileOperationsFeature=mq});var tk=$(Qf=>{"use strict";Object.defineProperty(Qf,"__esModule",{value:!0});Qf.LinkedEditingRangeFeature=void 0;var hq=Ze(),gq=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(hq.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};Qf.LinkedEditingRangeFeature=gq});var rk=$(Zf=>{"use strict";Object.defineProperty(Zf,"__esModule",{value:!0});Zf.TypeHierarchyFeature=void 0;var Gv=Ze(),yq=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(Gv.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=Gv.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=Gv.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Zf.TypeHierarchyFeature=yq});var ik=$(ep=>{"use strict";Object.defineProperty(ep,"__esModule",{value:!0});ep.InlineValueFeature=void 0;var nk=Ze(),vq=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(nk.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(nk.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};ep.InlineValueFeature=vq});var sk=$(tp=>{"use strict";Object.defineProperty(tp,"__esModule",{value:!0});tp.FoldingRangeFeature=void 0;var ok=Ze(),xq=t=>class extends t{get foldingRange(){return{refresh:()=>this.connection.sendRequest(ok.FoldingRangeRefreshRequest.type),on:e=>{let r=ok.FoldingRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};tp.FoldingRangeFeature=xq});var ak=$(rp=>{"use strict";Object.defineProperty(rp,"__esModule",{value:!0});rp.InlayHintFeature=void 0;var Hv=Ze(),Tq=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Hv.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Hv.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(Hv.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};rp.InlayHintFeature=Tq});var ck=$(np=>{"use strict";Object.defineProperty(np,"__esModule",{value:!0});np.DiagnosticFeature=void 0;var ju=Ze(),Rq=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(ju.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(ju.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(ju.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(ju.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(ju.WorkspaceDiagnosticRequest.partialResult,r)))}}};np.DiagnosticFeature=Rq});var uk=$(ip=>{"use strict";Object.defineProperty(ip,"__esModule",{value:!0});ip.MonikerFeature=void 0;var Sq=Ze(),bq=t=>class extends t{get moniker(){return{on:e=>{let r=Sq.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};ip.MonikerFeature=bq});var Ek=$(de=>{"use strict";Object.defineProperty(de,"__esModule",{value:!0});de.createConnection=de.combineFeatures=de.combineNotebooksFeatures=de.combineLanguagesFeatures=de.combineWorkspaceFeatures=de.combineWindowFeatures=de.combineClientFeatures=de.combineTracerFeatures=de.combineTelemetryFeatures=de.combineConsoleFeatures=de._NotebooksImpl=de._LanguagesImpl=de.BulkUnregistration=de.BulkRegistration=de.ErrorMessageTracker=void 0;var O=Ze(),Or=qv(),Vv=jv(),Y=XA(),Eq=YA(),Cq=JA(),_q=QA(),Aq=Dv(),kq=ZA(),wq=ek(),Pq=tk(),Nq=rk(),Oq=ik(),Iq=sk(),Dq=ak(),$q=ck(),Mq=Fv(),Lq=uk();function Kv(t){if(t!==null)return t}var zv=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};de.ErrorMessageTracker=zv;var op=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(O.MessageType.Error,e)}warn(e){this.send(O.MessageType.Warning,e)}info(e){this.send(O.MessageType.Info,e)}log(e){this.send(O.MessageType.Log,e)}debug(e){this.send(O.MessageType.Debug,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(O.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,O.RAL)().console.error("Sending log message failed")})}},Xv=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:O.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(O.ShowMessageRequest.type,n).then(Kv)}showWarningMessage(e,...r){let n={type:O.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(O.ShowMessageRequest.type,n).then(Kv)}showInformationMessage(e,...r){let n={type:O.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(O.ShowMessageRequest.type,n).then(Kv)}},lk=(0,kq.ShowDocumentFeature)((0,Y.ProgressFeature)(Xv)),dk;(function(t){function e(){return new sp}t.create=e})(dk||(de.BulkRegistration=dk={}));var sp=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Or.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=Vv.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},fk;(function(t){function e(){return new Uu(void 0,[])}t.create=e})(fk||(de.BulkUnregistration=fk={}));var Uu=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(O.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Or.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(O.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},o=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},ap=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof sp?this.registerMany(e):e instanceof Uu?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Or.string(r)?r:r.method,o=Vv.generateUuid(),s={registrations:[{id:o,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(O.RegistrationRequest.type,s).then(a=>(e.add({id:o,method:i}),e),a=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(a)))}registerSingle2(e,r){let n=Or.string(e)?e:e.method,i=Vv.generateUuid(),o={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(O.RegistrationRequest.type,o).then(s=>O.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),s=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(s)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(O.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(O.RegistrationRequest.type,r).then(()=>new Uu(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},Yv=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(O.ApplyWorkspaceEditRequest.type,n)}},pk=(0,wq.FileOperationsFeature)((0,Cq.WorkspaceFoldersFeature)((0,Eq.ConfigurationFeature)(Yv))),cp=class{constructor(){this._trace=O.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==O.Trace.Off&&this.connection.sendNotification(O.LogTraceNotification.type,{message:e,verbose:this._trace===O.Trace.Verbose?r:void 0}).catch(()=>{})}},up=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(O.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},lp=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,Y.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,Y.attachPartialResult)(this.connection,r)}};de._LanguagesImpl=lp;var mk=(0,Iq.FoldingRangeFeature)((0,Lq.MonikerFeature)((0,$q.DiagnosticFeature)((0,Dq.InlayHintFeature)((0,Oq.InlineValueFeature)((0,Nq.TypeHierarchyFeature)((0,Pq.LinkedEditingRangeFeature)((0,Aq.SemanticTokensFeature)((0,_q.CallHierarchyFeature)(lp))))))))),dp=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,Y.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,Y.attachPartialResult)(this.connection,r)}};de._NotebooksImpl=dp;var hk=(0,Mq.NotebookSyncFeature)(dp);function gk(t,e){return function(r){return e(t(r))}}de.combineConsoleFeatures=gk;function yk(t,e){return function(r){return e(t(r))}}de.combineTelemetryFeatures=yk;function vk(t,e){return function(r){return e(t(r))}}de.combineTracerFeatures=vk;function xk(t,e){return function(r){return e(t(r))}}de.combineClientFeatures=xk;function Tk(t,e){return function(r){return e(t(r))}}de.combineWindowFeatures=Tk;function Rk(t,e){return function(r){return e(t(r))}}de.combineWorkspaceFeatures=Rk;function Sk(t,e){return function(r){return e(t(r))}}de.combineLanguagesFeatures=Sk;function bk(t,e){return function(r){return e(t(r))}}de.combineNotebooksFeatures=bk;function Fq(t,e){function r(i,o,s){return i&&o?s(i,o):i||o}return{__brand:"features",console:r(t.console,e.console,gk),tracer:r(t.tracer,e.tracer,vk),telemetry:r(t.telemetry,e.telemetry,yk),client:r(t.client,e.client,xk),window:r(t.window,e.window,Tk),workspace:r(t.workspace,e.workspace,Rk),languages:r(t.languages,e.languages,Sk),notebooks:r(t.notebooks,e.notebooks,bk)}}de.combineFeatures=Fq;function qq(t,e,r){let n=r&&r.console?new(r.console(op)):new op,i=t(n);n.rawAttach(i);let o=r&&r.tracer?new(r.tracer(cp)):new cp,s=r&&r.telemetry?new(r.telemetry(up)):new up,a=r&&r.client?new(r.client(ap)):new ap,c=r&&r.window?new(r.window(lk)):new lk,u=r&&r.workspace?new(r.workspace(pk)):new pk,l=r&&r.languages?new(r.languages(mk)):new mk,d=r&&r.notebooks?new(r.notebooks(hk)):new hk,f=[n,o,s,a,c,u,l,d];function m(g){return g instanceof Promise?g:Or.thenable(g)?new Promise((p,S)=>{g.then(w=>p(w),w=>S(w))}):Promise.resolve(g)}let v,T,C,R={listen:()=>i.listen(),sendRequest:(g,...p)=>i.sendRequest(Or.string(g)?g:g.method,...p),onRequest:(g,p)=>i.onRequest(g,p),sendNotification:(g,p)=>{let S=Or.string(g)?g:g.method;return i.sendNotification(S,p)},onNotification:(g,p)=>i.onNotification(g,p),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:g=>(T=g,{dispose:()=>{T=void 0}}),onInitialized:g=>i.onNotification(O.InitializedNotification.type,g),onShutdown:g=>(v=g,{dispose:()=>{v=void 0}}),onExit:g=>(C=g,{dispose:()=>{C=void 0}}),get console(){return n},get telemetry(){return s},get tracer(){return o},get client(){return a},get window(){return c},get workspace(){return u},get languages(){return l},get notebooks(){return d},onDidChangeConfiguration:g=>i.onNotification(O.DidChangeConfigurationNotification.type,g),onDidChangeWatchedFiles:g=>i.onNotification(O.DidChangeWatchedFilesNotification.type,g),__textDocumentSync:void 0,onDidOpenTextDocument:g=>i.onNotification(O.DidOpenTextDocumentNotification.type,g),onDidChangeTextDocument:g=>i.onNotification(O.DidChangeTextDocumentNotification.type,g),onDidCloseTextDocument:g=>i.onNotification(O.DidCloseTextDocumentNotification.type,g),onWillSaveTextDocument:g=>i.onNotification(O.WillSaveTextDocumentNotification.type,g),onWillSaveTextDocumentWaitUntil:g=>i.onRequest(O.WillSaveTextDocumentWaitUntilRequest.type,g),onDidSaveTextDocument:g=>i.onNotification(O.DidSaveTextDocumentNotification.type,g),sendDiagnostics:g=>i.sendNotification(O.PublishDiagnosticsNotification.type,g),onHover:g=>i.onRequest(O.HoverRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),void 0)),onCompletion:g=>i.onRequest(O.CompletionRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onCompletionResolve:g=>i.onRequest(O.CompletionResolveRequest.type,g),onSignatureHelp:g=>i.onRequest(O.SignatureHelpRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),void 0)),onDeclaration:g=>i.onRequest(O.DeclarationRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onDefinition:g=>i.onRequest(O.DefinitionRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onTypeDefinition:g=>i.onRequest(O.TypeDefinitionRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onImplementation:g=>i.onRequest(O.ImplementationRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onReferences:g=>i.onRequest(O.ReferencesRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onDocumentHighlight:g=>i.onRequest(O.DocumentHighlightRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onDocumentSymbol:g=>i.onRequest(O.DocumentSymbolRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onWorkspaceSymbol:g=>i.onRequest(O.WorkspaceSymbolRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onWorkspaceSymbolResolve:g=>i.onRequest(O.WorkspaceSymbolResolveRequest.type,g),onCodeAction:g=>i.onRequest(O.CodeActionRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onCodeActionResolve:g=>i.onRequest(O.CodeActionResolveRequest.type,(p,S)=>g(p,S)),onCodeLens:g=>i.onRequest(O.CodeLensRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onCodeLensResolve:g=>i.onRequest(O.CodeLensResolveRequest.type,(p,S)=>g(p,S)),onDocumentFormatting:g=>i.onRequest(O.DocumentFormattingRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),void 0)),onDocumentRangeFormatting:g=>i.onRequest(O.DocumentRangeFormattingRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),void 0)),onDocumentOnTypeFormatting:g=>i.onRequest(O.DocumentOnTypeFormattingRequest.type,(p,S)=>g(p,S)),onRenameRequest:g=>i.onRequest(O.RenameRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),void 0)),onPrepareRename:g=>i.onRequest(O.PrepareRenameRequest.type,(p,S)=>g(p,S)),onDocumentLinks:g=>i.onRequest(O.DocumentLinkRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onDocumentLinkResolve:g=>i.onRequest(O.DocumentLinkResolveRequest.type,(p,S)=>g(p,S)),onDocumentColor:g=>i.onRequest(O.DocumentColorRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onColorPresentation:g=>i.onRequest(O.ColorPresentationRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onFoldingRanges:g=>i.onRequest(O.FoldingRangeRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onSelectionRanges:g=>i.onRequest(O.SelectionRangeRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),(0,Y.attachPartialResult)(i,p))),onExecuteCommand:g=>i.onRequest(O.ExecuteCommandRequest.type,(p,S)=>g(p,S,(0,Y.attachWorkDone)(i,p),void 0)),dispose:()=>i.dispose()};for(let g of f)g.attach(R);return i.onRequest(O.InitializeRequest.type,g=>{e.initialize(g),Or.string(g.trace)&&(o.trace=O.Trace.fromString(g.trace));for(let p of f)p.initialize(g.capabilities);if(T){let p=T(g,new O.CancellationTokenSource().token,(0,Y.attachWorkDone)(i,g),void 0);return m(p).then(S=>{if(S instanceof O.ResponseError)return S;let w=S;w||(w={capabilities:{}});let Q=w.capabilities;Q||(Q={},w.capabilities=Q),Q.textDocumentSync===void 0||Q.textDocumentSync===null?Q.textDocumentSync=Or.number(R.__textDocumentSync)?R.__textDocumentSync:O.TextDocumentSyncKind.None:!Or.number(Q.textDocumentSync)&&!Or.number(Q.textDocumentSync.change)&&(Q.textDocumentSync.change=Or.number(R.__textDocumentSync)?R.__textDocumentSync:O.TextDocumentSyncKind.None);for(let Vt of f)Vt.fillServerCapabilities(Q);return w})}else{let p={capabilities:{textDocumentSync:O.TextDocumentSyncKind.None}};for(let S of f)S.fillServerCapabilities(p.capabilities);return p}}),i.onRequest(O.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,v)return v(new O.CancellationTokenSource().token)}),i.onNotification(O.ExitNotification.type,()=>{try{C&&C()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(O.SetTraceNotification.type,g=>{o.trace=O.Trace.fromString(g.value)}),R}de.createConnection=qq});var Jv=$(Mt=>{"use strict";var jq=Mt&&Mt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),_k=Mt&&Mt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&jq(e,t,r)};Object.defineProperty(Mt,"__esModule",{value:!0});Mt.ProposedFeatures=Mt.NotebookDocuments=Mt.TextDocuments=Mt.SemanticTokensBuilder=void 0;var Uq=Dv();Object.defineProperty(Mt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return Uq.SemanticTokensBuilder}});var Bq=BA();_k(Ze(),Mt);var Wq=Mv();Object.defineProperty(Mt,"TextDocuments",{enumerable:!0,get:function(){return Wq.TextDocuments}});var Gq=Fv();Object.defineProperty(Mt,"NotebookDocuments",{enumerable:!0,get:function(){return Gq.NotebookDocuments}});_k(Ek(),Mt);var Ck;(function(t){t.all={__brand:"features",languages:Bq.InlineCompletionFeature}})(Ck||(Mt.ProposedFeatures=Ck={}))});var kk=$((Zte,Ak)=>{"use strict";Ak.exports=Ze()});var Ir=$(hn=>{"use strict";var Hq=hn&&hn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Pk=hn&&hn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Hq(e,t,r)};Object.defineProperty(hn,"__esModule",{value:!0});hn.createConnection=void 0;var fp=Jv();Pk(kk(),hn);Pk(Jv(),hn);var wk=!1,Kq={initialize:t=>{},get shutdownReceived(){return wk},set shutdownReceived(t){wk=t},exit:t=>{}};function Vq(t,e,r,n){let i,o,s,a;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),fp.ConnectionStrategy.is(t)||fp.ConnectionOptions.is(t)?a=t:(o=t,s=e,a=r);let c=u=>(0,fp.createProtocolConnection)(o,s,u,a);return(0,fp.createConnection)(c,Kq,i)}hn.createConnection=Vq});var Vk=$((xne,Kk)=>{"use strict";Kk.exports=Ir()});var je={};Fn(je,{AbstractAstReflection:()=>bi,AbstractCstNode:()=>Bc,AbstractLangiumParser:()=>Wc,AbstractParserErrorMessageProvider:()=>Bd,AbstractThreadedAsyncParser:()=>ly,AstUtils:()=>Oi,BiMap:()=>eo,Cancellation:()=>G,CompositeCstNodeImpl:()=>Yi,ContextCache:()=>ro,CstNodeBuilder:()=>Uc,CstUtils:()=>ul,DEFAULT_TOKENIZE_OPTIONS:()=>Zd,DONE_RESULT:()=>wt,DatatypeSymbol:()=>Ud,DefaultAstNodeDescriptionProvider:()=>au,DefaultAstNodeLocator:()=>uu,DefaultAsyncParser:()=>Ru,DefaultCommentProvider:()=>Tu,DefaultConfigurationProvider:()=>lu,DefaultDocumentBuilder:()=>du,DefaultDocumentValidator:()=>su,DefaultHydrator:()=>bu,DefaultIndexManager:()=>fu,DefaultJsonSerializer:()=>ru,DefaultLangiumDocumentFactory:()=>Xc,DefaultLangiumDocuments:()=>Yc,DefaultLexer:()=>oo,DefaultLexerErrorMessageProvider:()=>mu,DefaultLinker:()=>Jc,DefaultNameProvider:()=>Qc,DefaultReferenceDescriptionProvider:()=>cu,DefaultReferences:()=>Zc,DefaultScopeComputation:()=>to,DefaultScopeProvider:()=>no,DefaultServiceRegistry:()=>iu,DefaultTokenBuilder:()=>Qi,DefaultValueConverter:()=>Vc,DefaultWorkspaceLock:()=>Su,DefaultWorkspaceManager:()=>pu,Deferred:()=>Kt,Disposable:()=>ci,DisposableCache:()=>ua,DocumentCache:()=>Jd,DocumentState:()=>B,DocumentValidator:()=>Ar,EMPTY_SCOPE:()=>BF,EMPTY_STREAM:()=>Ua,EmptyFileSystem:()=>Au,EmptyFileSystemProvider:()=>sf,ErrorWithLocation:()=>Ai,GrammarAST:()=>Pi,GrammarUtils:()=>xl,IndentationAwareLexer:()=>py,IndentationAwareTokenBuilder:()=>of,JSDocDocumentationProvider:()=>xu,LangiumCompletionParser:()=>Hc,LangiumParser:()=>Gc,LangiumParserErrorMessageProvider:()=>na,LeafCstNodeImpl:()=>Xi,LexingMode:()=>ao,MapScope:()=>eu,Module:()=>fa,MultiMap:()=>Ur,OperationCancelled:()=>ln,ParserWorker:()=>dy,Reduction:()=>vo,RegExpUtils:()=>yl,RootCstNodeImpl:()=>ra,SimpleCache:()=>tu,StreamImpl:()=>fr,StreamScope:()=>ca,TextDocument:()=>ai,TreeStreamImpl:()=>Hr,URI:()=>Oe,UriUtils:()=>re,ValidationCategory:()=>da,ValidationRegistry:()=>ou,ValueConverter:()=>un,WorkspaceCache:()=>la,assertUnreachable:()=>Vr,createCompletionParser:()=>zg,createDefaultCoreModule:()=>Eu,createDefaultSharedCoreModule:()=>Cu,createGrammarConfig:()=>rh,createLangiumParser:()=>Xg,createParser:()=>Kc,delayNextTick:()=>ry,diagnosticData:()=>io,eagerLoad:()=>_u,getDiagnosticRange:()=>cE,indentationBuilderDefaultOptions:()=>fy,inject:()=>so,interruptAndCheck:()=>Ve,isAstNode:()=>Pe,isAstNodeDescription:()=>mm,isAstNodeWithComment:()=>nu,isCompositeCstNode:()=>Lr,isIMultiModeLexerDefinition:()=>sy,isJSDoc:()=>vu,isLeafCstNode:()=>qn,isLinkingError:()=>Ei,isNamed:()=>Yd,isOperationCancelled:()=>_r,isReference:()=>Et,isRootCstNode:()=>ja,isTokenTypeArray:()=>ef,isTokenTypeDictionary:()=>oy,loadGrammarFromJson:()=>af,parseJSDoc:()=>yu,prepareLangiumParser:()=>Jb,setInterruptionPeriod:()=>rE,startCancelableOperation:()=>zd,stream:()=>ee,toDiagnosticData:()=>uE,toDiagnosticSeverity:()=>Qd});var ul={};Fn(ul,{DefaultNameRegexp:()=>cl,RangeComparison:()=>Kr,compareRange:()=>gx,findCommentNode:()=>Ba,findDeclarationNodeAtOffset:()=>Qt,findLeafNodeAtOffset:()=>xm,findLeafNodeBeforeOffset:()=>Wa,flattenCst:()=>gm,getInteriorNodes:()=>Sw,getNextNode:()=>Tw,getPreviousNode:()=>vx,getStartlineNode:()=>Rw,inRange:()=>vm,isChildNode:()=>ym,isCommentNode:()=>hm,streamCst:()=>Ci,toDocumentSegment:()=>_i,tokenToRange:()=>xo});function Pe(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}function Et(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}function mm(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}function Ei(t){return typeof t=="object"&&t!==null&&Pe(t.container)&&Et(t.reference)&&typeof t.message=="string"}var bi=class{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,r){return Pe(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let o=this.computeIsSubtype(e,r);return n[r]=o,o}}getAllSubTypes(e){let r=this.allSubtypes[e];if(r)return r;{let n=this.getAllTypes(),i=[];for(let o of n)this.isSubtype(o,e)&&i.push(o);return this.allSubtypes[e]=i,i}}};function Lr(t){return typeof t=="object"&&t!==null&&Array.isArray(t.content)}function qn(t){return typeof t=="object"&&t!==null&&typeof t.tokenType=="object"}function ja(t){return Lr(t)&&typeof t.fullText=="string"}var fr=class t{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){return new t(()=>({first:this.startFn(),firstDone:!1,iterator:e[Symbol.iterator]()}),r=>{let n;if(!r.firstDone){do if(n=this.nextFn(r.first),!n.done)return n;while(!n.done);r.firstDone=!0}do if(n=r.iterator.next(),!n.done)return n;while(!n.done);return wt})}join(e=","){let r=this.iterator(),n="",i,o=!1;do i=r.next(),i.done||(o&&(n+=e),n+=xw(i.value)),o=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,o=n.next();for(;!o.done;){if(i>=r&&o.value===e)return i;o=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new t(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?wt:{done:!1,value:e(i)}})}filter(e){return new t(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return wt})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,o=n.next();for(;!o.done;)i===void 0?i=o.value:i=e(i,o.value),o=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let o=this.recursiveReduce(e,r,n);return o===void 0?i.value:r(o,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new t(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let o=r.iterator.next();if(o.done)r.iterator=void 0;else return o}let{done:n,value:i}=this.nextFn(r.this);if(!n){let o=e(i);if(al(o))r.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}}while(r.iterator);return wt})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new t(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let s=n.iterator.next();if(s.done)n.iterator=void 0;else return s}let{done:i,value:o}=r.nextFn(n.this);if(!i)if(al(o))n.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}while(n.iterator);return wt})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new t(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new t(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?wt:this.nextFn(r.state)))}distinct(e){return new t(()=>({set:new Set,internalState:this.startFn()}),r=>{let n;do if(n=this.nextFn(r.internalState),!n.done){let i=e?e(n.value):n.value;if(!r.set.has(i))return r.set.add(i),n}while(!n.done);return wt})}exclude(e,r){let n=new Set;for(let i of e){let o=r?r(i):i;n.add(o)}return this.filter(i=>{let o=r?r(i):i;return!n.has(o)})}};function xw(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function al(t){return!!t&&typeof t[Symbol.iterator]=="function"}var Ua=new fr(()=>{},()=>wt),wt=Object.freeze({done:!0,value:void 0});function ee(...t){if(t.length===1){let e=t[0];if(e instanceof fr)return e;if(al(e))return new fr(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new fr(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:wt)}return t.length>1?new fr(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];al(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return wt}):Ua}var Hr=class extends fr{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let s=i.iterators[i.iterators.length-1].next();if(s.done)i.iterators.pop();else return i.iterators.push(r(s.value)[Symbol.iterator]()),s}return wt})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}},vo;(function(t){function e(o){return o.reduce((s,a)=>s+a,0)}t.sum=e;function r(o){return o.reduce((s,a)=>s*a,0)}t.product=r;function n(o){return o.reduce((s,a)=>Math.min(s,a))}t.min=n;function i(o){return o.reduce((s,a)=>Math.max(s,a))}t.max=i})(vo||(vo={}));function Ci(t){return new Hr(t,e=>Lr(e)?e.content:[],{includeRoot:!0})}function gm(t){return Ci(t).filter(qn)}function ym(t,e){for(;t.container;)if(t=t.container,t===e)return!0;return!1}function xo(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}function _i(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}var Kr;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside",t[t.Outside=5]="Outside"})(Kr||(Kr={}));function gx(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<=e.start.character)return Kr.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>=e.end.character)return Kr.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?Kr.Inside:r?Kr.OverlapBack:n?Kr.OverlapFront:Kr.Outside}function vm(t,e){return gx(t,e)>Kr.After}var cl=/^[\w\p{L}]$/u;function Qt(t,e,r=cl){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return xm(t,e)}}function Ba(t,e){if(t){let r=vx(t,!0);if(r&&hm(r,e))return r;if(ja(t)){let n=t.content.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let o=t.content[i];if(hm(o,e))return o}}}}function hm(t,e){return qn(t)&&e.includes(t.tokenType.name)}function xm(t,e){if(qn(t))return t;if(Lr(t)){let r=yx(t,e,!1);if(r)return xm(r,e)}}function Wa(t,e){if(qn(t))return t;if(Lr(t)){let r=yx(t,e,!0);if(r)return Wa(r,e)}}function yx(t,e,r){let n=0,i=t.content.length-1,o;for(;n<=i;){let s=Math.floor((n+i)/2),a=t.content[s];if(a.offset<=e&&a.end>e)return a;a.end<=e?(o=r?a:void 0,n=s+1):i=s-1}return o}function vx(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t);for(;n>0;){n--;let i=r.content[n];if(e||!i.hidden)return i}t=r}}function Tw(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t),i=r.content.length-1;for(;n<i;){n++;let o=r.content[n];if(e||!o.hidden)return o}t=r}}function Rw(t){if(t.range.start.character===0)return t;let e=t.range.start.line,r=t,n;for(;t.container;){let i=t.container,o=n??i.content.indexOf(t);if(o===0?(t=i,n=void 0):(n=o-1,t=i.content[n]),t.range.start.line!==e)break;r=t}return r}function Sw(t,e){let r=bw(t,e);return r?r.parent.content.slice(r.a+1,r.b):[]}function bw(t,e){let r=hx(t),n=hx(e),i;for(let o=0;o<r.length&&o<n.length;o++){let s=r[o],a=n[o];if(s.parent===a.parent)i={parent:s.parent,a:s.index,b:a.index};else break}return i}function hx(t){let e=[];for(;t.container;){let r=t.container,n=r.content.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}var xl={};Fn(xl,{findAssignment:()=>Qm,findNameAssignment:()=>vl,findNodeForKeyword:()=>Ym,findNodeForProperty:()=>ac,findNodesForKeyword:()=>Hw,findNodesForKeywordInternal:()=>Jm,findNodesForProperty:()=>zm,getActionAtElement:()=>Ax,getActionType:()=>wx,getAllReachableRules:()=>oc,getAllRulesUsedForCrossReferences:()=>Gw,getCrossReferenceTerminal:()=>sc,getEntryRule:()=>ic,getExplicitRuleType:()=>Xr,getHiddenRules:()=>Ex,getRuleType:()=>eh,getRuleTypeName:()=>zw,getTypeName:()=>Li,isArrayCardinality:()=>Zm,isArrayOperator:()=>Kw,isCommentTerminal:()=>Vm,isDataType:()=>Vw,isDataTypeRule:()=>cc,isOptionalCardinality:()=>Mi,terminalRegex:()=>Un});var Ai=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};function Vr(t){throw new Error("Error! The input value was not handled.")}var Pi={};Fn(Pi,{AbstractElement:()=>So,AbstractRule:()=>To,AbstractType:()=>Ro,Action:()=>Uo,Alternatives:()=>Bo,ArrayLiteral:()=>bo,ArrayType:()=>Eo,Assignment:()=>Wo,BooleanLiteral:()=>Co,CharacterRange:()=>Go,Condition:()=>Ga,Conjunction:()=>_o,CrossReference:()=>Ho,Disjunction:()=>Ao,EndOfFile:()=>Ko,Grammar:()=>ko,GrammarImport:()=>Ka,Group:()=>Vo,InferredType:()=>wo,Interface:()=>Po,Keyword:()=>zo,LangiumGrammarAstReflection:()=>is,LangiumGrammarTerminals:()=>Ew,NamedArgument:()=>Va,NegatedToken:()=>Xo,Negation:()=>No,NumberLiteral:()=>Oo,Parameter:()=>Io,ParameterReference:()=>Do,ParserRule:()=>$o,ReferenceType:()=>Mo,RegexToken:()=>Yo,ReturnType:()=>za,RuleCall:()=>Jo,SimpleType:()=>Lo,StringLiteral:()=>Fo,TerminalAlternatives:()=>Qo,TerminalGroup:()=>Zo,TerminalRule:()=>ki,TerminalRuleCall:()=>es,Type:()=>qo,TypeAttribute:()=>Xa,TypeDefinition:()=>ll,UnionType:()=>jo,UnorderedGroup:()=>ts,UntilToken:()=>rs,ValueLiteral:()=>Ha,Wildcard:()=>ns,isAbstractElement:()=>wi,isAbstractRule:()=>Cw,isAbstractType:()=>_w,isAction:()=>Fr,isAlternatives:()=>os,isArrayLiteral:()=>Nw,isArrayType:()=>Tm,isAssignment:()=>Pt,isBooleanLiteral:()=>Rm,isCharacterRange:()=>wm,isCondition:()=>Aw,isConjunction:()=>Sm,isCrossReference:()=>pr,isDisjunction:()=>bm,isEndOfFile:()=>Pm,isFeatureName:()=>kw,isGrammar:()=>Ow,isGrammarImport:()=>Iw,isGroup:()=>Rr,isInferredType:()=>Ya,isInterface:()=>dl,isKeyword:()=>pt,isNamedArgument:()=>Dw,isNegatedToken:()=>Nm,isNegation:()=>Em,isNumberLiteral:()=>$w,isParameter:()=>Mw,isParameterReference:()=>Cm,isParserRule:()=>$e,isPrimitiveType:()=>xx,isReferenceType:()=>_m,isRegexToken:()=>Om,isReturnType:()=>Am,isRuleCall:()=>Zt,isSimpleType:()=>fl,isStringLiteral:()=>Lw,isTerminalAlternatives:()=>Im,isTerminalGroup:()=>Dm,isTerminalRule:()=>jt,isTerminalRuleCall:()=>pl,isType:()=>Ja,isTypeAttribute:()=>Fw,isTypeDefinition:()=>ww,isUnionType:()=>km,isUnorderedGroup:()=>ss,isUntilToken:()=>$m,isValueLiteral:()=>Pw,isWildcard:()=>Mm,reflection:()=>X});var Ew={ID:/\^?[_a-zA-Z][\w_]*/,STRING:/"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/,NUMBER:/NaN|-?((\d*\.\d+|\d+)([Ee][+-]?\d+)?|Infinity)/,RegexLiteral:/\/(?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+\/[a-z]*/,WS:/\s+/,ML_COMMENT:/\/\*[\s\S]*?\*\//,SL_COMMENT:/\/\/[^\n\r]*/},To="AbstractRule";function Cw(t){return X.isInstance(t,To)}var Ro="AbstractType";function _w(t){return X.isInstance(t,Ro)}var Ga="Condition";function Aw(t){return X.isInstance(t,Ga)}function kw(t){return xx(t)||t==="current"||t==="entry"||t==="extends"||t==="false"||t==="fragment"||t==="grammar"||t==="hidden"||t==="import"||t==="interface"||t==="returns"||t==="terminal"||t==="true"||t==="type"||t==="infer"||t==="infers"||t==="with"||typeof t=="string"&&/\^?[_a-zA-Z][\w_]*/.test(t)}function xx(t){return t==="string"||t==="number"||t==="boolean"||t==="Date"||t==="bigint"}var ll="TypeDefinition";function ww(t){return X.isInstance(t,ll)}var Ha="ValueLiteral";function Pw(t){return X.isInstance(t,Ha)}var So="AbstractElement";function wi(t){return X.isInstance(t,So)}var bo="ArrayLiteral";function Nw(t){return X.isInstance(t,bo)}var Eo="ArrayType";function Tm(t){return X.isInstance(t,Eo)}var Co="BooleanLiteral";function Rm(t){return X.isInstance(t,Co)}var _o="Conjunction";function Sm(t){return X.isInstance(t,_o)}var Ao="Disjunction";function bm(t){return X.isInstance(t,Ao)}var ko="Grammar";function Ow(t){return X.isInstance(t,ko)}var Ka="GrammarImport";function Iw(t){return X.isInstance(t,Ka)}var wo="InferredType";function Ya(t){return X.isInstance(t,wo)}var Po="Interface";function dl(t){return X.isInstance(t,Po)}var Va="NamedArgument";function Dw(t){return X.isInstance(t,Va)}var No="Negation";function Em(t){return X.isInstance(t,No)}var Oo="NumberLiteral";function $w(t){return X.isInstance(t,Oo)}var Io="Parameter";function Mw(t){return X.isInstance(t,Io)}var Do="ParameterReference";function Cm(t){return X.isInstance(t,Do)}var $o="ParserRule";function $e(t){return X.isInstance(t,$o)}var Mo="ReferenceType";function _m(t){return X.isInstance(t,Mo)}var za="ReturnType";function Am(t){return X.isInstance(t,za)}var Lo="SimpleType";function fl(t){return X.isInstance(t,Lo)}var Fo="StringLiteral";function Lw(t){return X.isInstance(t,Fo)}var ki="TerminalRule";function jt(t){return X.isInstance(t,ki)}var qo="Type";function Ja(t){return X.isInstance(t,qo)}var Xa="TypeAttribute";function Fw(t){return X.isInstance(t,Xa)}var jo="UnionType";function km(t){return X.isInstance(t,jo)}var Uo="Action";function Fr(t){return X.isInstance(t,Uo)}var Bo="Alternatives";function os(t){return X.isInstance(t,Bo)}var Wo="Assignment";function Pt(t){return X.isInstance(t,Wo)}var Go="CharacterRange";function wm(t){return X.isInstance(t,Go)}var Ho="CrossReference";function pr(t){return X.isInstance(t,Ho)}var Ko="EndOfFile";function Pm(t){return X.isInstance(t,Ko)}var Vo="Group";function Rr(t){return X.isInstance(t,Vo)}var zo="Keyword";function pt(t){return X.isInstance(t,zo)}var Xo="NegatedToken";function Nm(t){return X.isInstance(t,Xo)}var Yo="RegexToken";function Om(t){return X.isInstance(t,Yo)}var Jo="RuleCall";function Zt(t){return X.isInstance(t,Jo)}var Qo="TerminalAlternatives";function Im(t){return X.isInstance(t,Qo)}var Zo="TerminalGroup";function Dm(t){return X.isInstance(t,Zo)}var es="TerminalRuleCall";function pl(t){return X.isInstance(t,es)}var ts="UnorderedGroup";function ss(t){return X.isInstance(t,ts)}var rs="UntilToken";function $m(t){return X.isInstance(t,rs)}var ns="Wildcard";function Mm(t){return X.isInstance(t,ns)}var is=class extends bi{getAllTypes(){return[So,To,Ro,Uo,Bo,bo,Eo,Wo,Co,Go,Ga,_o,Ho,Ao,Ko,ko,Ka,Vo,wo,Po,zo,Va,Xo,No,Oo,Io,Do,$o,Mo,Yo,za,Jo,Lo,Fo,Qo,Zo,ki,es,qo,Xa,ll,jo,ts,rs,Ha,ns]}computeIsSubtype(e,r){switch(e){case Uo:case Bo:case Wo:case Go:case Ho:case Ko:case Vo:case zo:case Xo:case Yo:case Jo:case Qo:case Zo:case es:case ts:case rs:case ns:return this.isSubtype(So,r);case bo:case Oo:case Fo:return this.isSubtype(Ha,r);case Eo:case Mo:case Lo:case jo:return this.isSubtype(ll,r);case Co:return this.isSubtype(Ga,r)||this.isSubtype(Ha,r);case _o:case Ao:case No:case Do:return this.isSubtype(Ga,r);case wo:case Po:case qo:return this.isSubtype(Ro,r);case $o:return this.isSubtype(To,r)||this.isSubtype(Ro,r);case ki:return this.isSubtype(To,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return Ro;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return To;case"Grammar:usedGrammars":return ko;case"NamedArgument:parameter":case"ParameterReference:parameter":return Io;case"TerminalRuleCall:rule":return ki;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case So:return{name:So,properties:[{name:"cardinality"},{name:"lookahead"}]};case bo:return{name:bo,properties:[{name:"elements",defaultValue:[]}]};case Eo:return{name:Eo,properties:[{name:"elementType"}]};case Co:return{name:Co,properties:[{name:"true",defaultValue:!1}]};case _o:return{name:_o,properties:[{name:"left"},{name:"right"}]};case Ao:return{name:Ao,properties:[{name:"left"},{name:"right"}]};case ko:return{name:ko,properties:[{name:"definesHiddenTokens",defaultValue:!1},{name:"hiddenTokens",defaultValue:[]},{name:"imports",defaultValue:[]},{name:"interfaces",defaultValue:[]},{name:"isDeclared",defaultValue:!1},{name:"name"},{name:"rules",defaultValue:[]},{name:"types",defaultValue:[]},{name:"usedGrammars",defaultValue:[]}]};case Ka:return{name:Ka,properties:[{name:"path"}]};case wo:return{name:wo,properties:[{name:"name"}]};case Po:return{name:Po,properties:[{name:"attributes",defaultValue:[]},{name:"name"},{name:"superTypes",defaultValue:[]}]};case Va:return{name:Va,properties:[{name:"calledByName",defaultValue:!1},{name:"parameter"},{name:"value"}]};case No:return{name:No,properties:[{name:"value"}]};case Oo:return{name:Oo,properties:[{name:"value"}]};case Io:return{name:Io,properties:[{name:"name"}]};case Do:return{name:Do,properties:[{name:"parameter"}]};case $o:return{name:$o,properties:[{name:"dataType"},{name:"definesHiddenTokens",defaultValue:!1},{name:"definition"},{name:"entry",defaultValue:!1},{name:"fragment",defaultValue:!1},{name:"hiddenTokens",defaultValue:[]},{name:"inferredType"},{name:"name"},{name:"parameters",defaultValue:[]},{name:"returnType"},{name:"wildcard",defaultValue:!1}]};case Mo:return{name:Mo,properties:[{name:"referenceType"}]};case za:return{name:za,properties:[{name:"name"}]};case Lo:return{name:Lo,properties:[{name:"primitiveType"},{name:"stringType"},{name:"typeRef"}]};case Fo:return{name:Fo,properties:[{name:"value"}]};case ki:return{name:ki,properties:[{name:"definition"},{name:"fragment",defaultValue:!1},{name:"hidden",defaultValue:!1},{name:"name"},{name:"type"}]};case qo:return{name:qo,properties:[{name:"name"},{name:"type"}]};case Xa:return{name:Xa,properties:[{name:"defaultValue"},{name:"isOptional",defaultValue:!1},{name:"name"},{name:"type"}]};case jo:return{name:jo,properties:[{name:"types",defaultValue:[]}]};case Uo:return{name:Uo,properties:[{name:"cardinality"},{name:"feature"},{name:"inferredType"},{name:"lookahead"},{name:"operator"},{name:"type"}]};case Bo:return{name:Bo,properties:[{name:"cardinality"},{name:"elements",defaultValue:[]},{name:"lookahead"}]};case Wo:return{name:Wo,properties:[{name:"cardinality"},{name:"feature"},{name:"lookahead"},{name:"operator"},{name:"terminal"}]};case Go:return{name:Go,properties:[{name:"cardinality"},{name:"left"},{name:"lookahead"},{name:"right"}]};case Ho:return{name:Ho,properties:[{name:"cardinality"},{name:"deprecatedSyntax",defaultValue:!1},{name:"lookahead"},{name:"terminal"},{name:"type"}]};case Ko:return{name:Ko,properties:[{name:"cardinality"},{name:"lookahead"}]};case Vo:return{name:Vo,properties:[{name:"cardinality"},{name:"elements",defaultValue:[]},{name:"guardCondition"},{name:"lookahead"}]};case zo:return{name:zo,properties:[{name:"cardinality"},{name:"lookahead"},{name:"value"}]};case Xo:return{name:Xo,properties:[{name:"cardinality"},{name:"lookahead"},{name:"terminal"}]};case Yo:return{name:Yo,properties:[{name:"cardinality"},{name:"lookahead"},{name:"regex"}]};case Jo:return{name:Jo,properties:[{name:"arguments",defaultValue:[]},{name:"cardinality"},{name:"lookahead"},{name:"rule"}]};case Qo:return{name:Qo,properties:[{name:"cardinality"},{name:"elements",defaultValue:[]},{name:"lookahead"}]};case Zo:return{name:Zo,properties:[{name:"cardinality"},{name:"elements",defaultValue:[]},{name:"lookahead"}]};case es:return{name:es,properties:[{name:"cardinality"},{name:"lookahead"},{name:"rule"}]};case ts:return{name:ts,properties:[{name:"cardinality"},{name:"elements",defaultValue:[]},{name:"lookahead"}]};case rs:return{name:rs,properties:[{name:"cardinality"},{name:"lookahead"},{name:"terminal"}]};case ns:return{name:ns,properties:[{name:"cardinality"},{name:"lookahead"}]};default:return{name:e,properties:[]}}}},X=new is;var Oi={};Fn(Oi,{assignMandatoryProperties:()=>Za,copyAstNode:()=>Fm,findLocalReferences:()=>jw,findRootNode:()=>Qa,getContainerOfType:()=>mr,getDocument:()=>ot,hasContainerOfType:()=>qw,linkContentToContainer:()=>ml,streamAllContents:()=>hr,streamAst:()=>Sr,streamContents:()=>Ni,streamReferences:()=>as});function ml(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{Pe(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):Pe(r)&&(r.$container=t,r.$containerProperty=e))}function mr(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}function qw(t,e){let r=t;for(;r;){if(e(r))return!0;r=r.$container}return!1}function ot(t){let r=Qa(t).$document;if(!r)throw new Error("AST node has no document.");return r}function Qa(t){for(;t.$container;)t=t.$container;return t}function Ni(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new fr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let o=t[i];if(Pe(o)){if(n.keyIndex++,Lm(o,r))return{done:!1,value:o}}else if(Array.isArray(o)){for(;n.arrayIndex<o.length;){let s=n.arrayIndex++,a=o[s];if(Pe(a)&&Lm(a,r))return{done:!1,value:a}}n.arrayIndex=0}}n.keyIndex++}return wt})}function hr(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new Hr(t,r=>Ni(r,e))}function Sr(t,e){if(t){if(e?.range&&!Lm(t,e.range))return new Hr(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new Hr(t,r=>Ni(r,e),{includeRoot:!0})}function Lm(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?vm(n,e):!1}function as(t){return new fr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if(Et(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,o=n[i];if(Et(o))return{done:!1,value:{reference:o,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return wt})}function jw(t,e=ot(t).parseResult.value){let r=[];return Sr(e).forEach(n=>{as(n).forEach(i=>{i.reference.ref===t&&r.push(i.reference)})}),ee(r)}function Za(t,e){let r=t.getTypeMetaData(e.$type),n=e;for(let i of r.properties)i.defaultValue!==void 0&&n[i.name]===void 0&&(n[i.name]=Tx(i.defaultValue))}function Tx(t){return Array.isArray(t)?[...t.map(Tx)]:t}function Fm(t,e){let r={$type:t.$type};for(let[n,i]of Object.entries(t))if(!n.startsWith("$"))if(Pe(i))r[n]=Fm(i,e);else if(Et(i))r[n]=e(r,n,i.$refNode,i.$refText);else if(Array.isArray(i)){let o=[];for(let s of i)Pe(s)?o.push(Fm(s,e)):Et(s)?o.push(e(r,n,s.$refNode,s.$refText)):o.push(s);r[n]=o}else r[n]=i;return ml(r),r}var yl={};Fn(yl,{NEWLINE_REGEXP:()=>Bm,escapeRegExp:()=>jn,getTerminalParts:()=>Ww,isMultilineComment:()=>Wm,isWhitespace:()=>nc,partialMatches:()=>Gm,partialRegExp:()=>bx,whitespaceCharacters:()=>Sx});function K(t){return t.charCodeAt(0)}function hl(t,e){Array.isArray(t)?t.forEach(function(r){e.push(r)}):e.push(t)}function cs(t,e){if(t[e]===!0)throw"duplicate flag "+e;let r=t[e];t[e]=!0}function Ii(t){if(t===void 0)throw Error("Internal Error - Should never get here!");return!0}function ec(){throw Error("Internal Error - Should never get here!")}function qm(t){return t.type==="Character"}var tc=[];for(let t=K("0");t<=K("9");t++)tc.push(t);var rc=[K("_")].concat(tc);for(let t=K("a");t<=K("z");t++)rc.push(t);for(let t=K("A");t<=K("Z");t++)rc.push(t);var jm=[K(" "),K("\f"),K(`
`),K("\r"),K("	"),K("\v"),K("	"),K("\xA0"),K("\u1680"),K("\u2000"),K("\u2001"),K("\u2002"),K("\u2003"),K("\u2004"),K("\u2005"),K("\u2006"),K("\u2007"),K("\u2008"),K("\u2009"),K("\u200A"),K("\u2028"),K("\u2029"),K("\u202F"),K("\u205F"),K("\u3000"),K("\uFEFF")];var Uw=/[0-9a-fA-F]/,gl=/[0-9]/,Bw=/[1-9]/,Di=class{constructor(){this.idx=0,this.input="",this.groupIdx=0}saveState(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}}restoreState(e){this.idx=e.idx,this.input=e.input,this.groupIdx=e.groupIdx}pattern(e){this.idx=0,this.input=e,this.groupIdx=0,this.consumeChar("/");let r=this.disjunction();this.consumeChar("/");let n={type:"Flags",loc:{begin:this.idx,end:e.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};for(;this.isRegExpFlag();)switch(this.popChar()){case"g":cs(n,"global");break;case"i":cs(n,"ignoreCase");break;case"m":cs(n,"multiLine");break;case"u":cs(n,"unicode");break;case"y":cs(n,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:n,value:r,loc:this.loc(0)}}disjunction(){let e=[],r=this.idx;for(e.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),e.push(this.alternative());return{type:"Disjunction",value:e,loc:this.loc(r)}}alternative(){let e=[],r=this.idx;for(;this.isTerm();)e.push(this.term());return{type:"Alternative",value:e,loc:this.loc(r)}}term(){return this.isAssertion()?this.assertion():this.atom()}assertion(){let e=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(e)};case"$":return{type:"EndAnchor",loc:this.loc(e)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(e)};case"B":return{type:"NonWordBoundary",loc:this.loc(e)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");let r;switch(this.popChar()){case"=":r="Lookahead";break;case"!":r="NegativeLookahead";break}Ii(r);let n=this.disjunction();return this.consumeChar(")"),{type:r,value:n,loc:this.loc(e)}}return ec()}quantifier(e=!1){let r,n=this.idx;switch(this.popChar()){case"*":r={atLeast:0,atMost:1/0};break;case"+":r={atLeast:1,atMost:1/0};break;case"?":r={atLeast:0,atMost:1};break;case"{":let i=this.integerIncludingZero();switch(this.popChar()){case"}":r={atLeast:i,atMost:i};break;case",":let o;this.isDigit()?(o=this.integerIncludingZero(),r={atLeast:i,atMost:o}):r={atLeast:i,atMost:1/0},this.consumeChar("}");break}if(e===!0&&r===void 0)return;Ii(r);break}if(!(e===!0&&r===void 0)&&Ii(r))return this.peekChar(0)==="?"?(this.consumeChar("?"),r.greedy=!1):r.greedy=!0,r.type="Quantifier",r.loc=this.loc(n),r}atom(){let e,r=this.idx;switch(this.peekChar()){case".":e=this.dotAll();break;case"\\":e=this.atomEscape();break;case"[":e=this.characterClass();break;case"(":e=this.group();break}return e===void 0&&this.isPatternCharacter()&&(e=this.patternCharacter()),Ii(e)?(e.loc=this.loc(r),this.isQuantifier()&&(e.quantifier=this.quantifier()),e):ec()}dotAll(){return this.consumeChar("."),{type:"Set",complement:!0,value:[K(`
`),K("\r"),K("\u2028"),K("\u2029")]}}atomEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}decimalEscapeAtom(){return{type:"GroupBackReference",value:this.positiveInteger()}}characterClassEscape(){let e,r=!1;switch(this.popChar()){case"d":e=tc;break;case"D":e=tc,r=!0;break;case"s":e=jm;break;case"S":e=jm,r=!0;break;case"w":e=rc;break;case"W":e=rc,r=!0;break}return Ii(e)?{type:"Set",value:e,complement:r}:ec()}controlEscapeAtom(){let e;switch(this.popChar()){case"f":e=K("\f");break;case"n":e=K(`
`);break;case"r":e=K("\r");break;case"t":e=K("	");break;case"v":e=K("\v");break}return Ii(e)?{type:"Character",value:e}:ec()}controlLetterEscapeAtom(){this.consumeChar("c");let e=this.popChar();if(/[a-zA-Z]/.test(e)===!1)throw Error("Invalid ");return{type:"Character",value:e.toUpperCase().charCodeAt(0)-64}}nulCharacterAtom(){return this.consumeChar("0"),{type:"Character",value:K("\0")}}hexEscapeSequenceAtom(){return this.consumeChar("x"),this.parseHexDigits(2)}regExpUnicodeEscapeSequenceAtom(){return this.consumeChar("u"),this.parseHexDigits(4)}identityEscapeAtom(){let e=this.popChar();return{type:"Character",value:K(e)}}classPatternCharacterAtom(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:let e=this.popChar();return{type:"Character",value:K(e)}}}characterClass(){let e=[],r=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),r=!0);this.isClassAtom();){let n=this.classAtom(),i=n.type==="Character";if(qm(n)&&this.isRangeDash()){this.consumeChar("-");let o=this.classAtom(),s=o.type==="Character";if(qm(o)){if(o.value<n.value)throw Error("Range out of order in character class");e.push({from:n.value,to:o.value})}else hl(n.value,e),e.push(K("-")),hl(o.value,e)}else hl(n.value,e)}return this.consumeChar("]"),{type:"Set",complement:r,value:e}}classAtom(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}}classEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:K("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}group(){let e=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),e=!1;break;default:this.groupIdx++;break}let r=this.disjunction();this.consumeChar(")");let n={type:"Group",capturing:e,value:r};return e&&(n.idx=this.groupIdx),n}positiveInteger(){let e=this.popChar();if(Bw.test(e)===!1)throw Error("Expecting a positive integer");for(;gl.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}integerIncludingZero(){let e=this.popChar();if(gl.test(e)===!1)throw Error("Expecting an integer");for(;gl.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}patternCharacter(){let e=this.popChar();switch(e){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:K(e)}}}isRegExpFlag(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}}isRangeDash(){return this.peekChar()==="-"&&this.isClassAtom(1)}isDigit(){return gl.test(this.peekChar(0))}isClassAtom(e=0){switch(this.peekChar(e)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}isTerm(){return this.isAtom()||this.isAssertion()}isAtom(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}}isAssertion(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}}isQuantifier(){let e=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(e)}}isPatternCharacter(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}parseHexDigits(e){let r="";for(let i=0;i<e;i++){let o=this.popChar();if(Uw.test(o)===!1)throw Error("Expecting a HexDecimal digits");r+=o}return{type:"Character",value:parseInt(r,16)}}peekChar(e=0){return this.input[this.idx+e]}popChar(){let e=this.peekChar(0);return this.consumeChar(void 0),e}consumeChar(e){if(e!==void 0&&this.input[this.idx]!==e)throw Error("Expected: '"+e+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++}loc(e){return{begin:e,end:this.idx}}};var zr=class{visitChildren(e){for(let r in e){let n=e[r];e.hasOwnProperty(r)&&(n.type!==void 0?this.visit(n):Array.isArray(n)&&n.forEach(i=>{this.visit(i)},this))}}visit(e){switch(e.type){case"Pattern":this.visitPattern(e);break;case"Flags":this.visitFlags(e);break;case"Disjunction":this.visitDisjunction(e);break;case"Alternative":this.visitAlternative(e);break;case"StartAnchor":this.visitStartAnchor(e);break;case"EndAnchor":this.visitEndAnchor(e);break;case"WordBoundary":this.visitWordBoundary(e);break;case"NonWordBoundary":this.visitNonWordBoundary(e);break;case"Lookahead":this.visitLookahead(e);break;case"NegativeLookahead":this.visitNegativeLookahead(e);break;case"Character":this.visitCharacter(e);break;case"Set":this.visitSet(e);break;case"Group":this.visitGroup(e);break;case"GroupBackReference":this.visitGroupBackReference(e);break;case"Quantifier":this.visitQuantifier(e);break}this.visitChildren(e)}visitPattern(e){}visitFlags(e){}visitDisjunction(e){}visitAlternative(e){}visitStartAnchor(e){}visitEndAnchor(e){}visitWordBoundary(e){}visitNonWordBoundary(e){}visitLookahead(e){}visitNegativeLookahead(e){}visitCharacter(e){}visitSet(e){}visitGroup(e){}visitGroupBackReference(e){}visitQuantifier(e){}};var Bm=/\r?\n/gm,Rx=new Di,Um=class extends zr{constructor(){super(...arguments),this.isStarting=!0,this.endRegexpStack=[],this.multiline=!1}get endRegex(){return this.endRegexpStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegexp="",this.isStarting=!0,this.endRegexpStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexpStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexpStack=[];else{let n=jn(r);this.endRegexpStack.push(n),this.isStarting&&(this.startRegexp+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=!!`
`.match(n)}if(e.quantifier)this.isStarting=!1,this.endRegexpStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexpStack.push(r),this.isStarting&&(this.startRegexp+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},$i=new Um;function Ww(t){try{typeof t!="string"&&(t=t.source),t=`/${t}/`;let e=Rx.pattern(t),r=[];for(let n of e.value.value)$i.reset(t),$i.visit(n),r.push({start:$i.startRegexp,end:$i.endRegex});return r}catch{return[]}}function Wm(t){try{return typeof t=="string"&&(t=new RegExp(t)),t=t.toString(),$i.reset(t),$i.visit(Rx.pattern(t)),$i.multiline}catch{return!1}}var Sx=`\f
\r	\v \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF`.split("");function nc(t){let e=typeof t=="string"?new RegExp(t):t;return Sx.some(r=>e.test(r))}function jn(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Gm(t,e){let r=bx(t),n=e.match(r);return!!n&&n[0].length>0}function bx(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let o="",s;function a(u){o+=r.substr(n,u),n+=u}function c(u){o+="(?:"+r.substr(n,u)+"|$)",n+=u}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":c(3);break;case"x":c(4);break;case"u":e.unicode?r[n+2]==="{"?c(r.indexOf("}",n)-n+1):c(6):c(2);break;case"p":case"P":e.unicode?c(r.indexOf("}",n)-n+1):c(2);break;case"k":c(r.indexOf(">",n)-n+1);break;default:c(2);break}break;case"[":s=/\[(?:\\.|.)*?\]/g,s.lastIndex=n,s=s.exec(r)||[],c(s[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":a(1);break;case"{":s=/\{\d+,?\d*\}/g,s.lastIndex=n,s=s.exec(r),s?a(s[0].length):c(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":o+="(?:",n+=3,o+=i()+"|$)";break;case"=":o+="(?=",n+=3,o+=i()+")";break;case"!":s=n,n+=3,i(),o+=r.substr(s,n-s);break;case"<":switch(r[n+3]){case"=":case"!":s=n,n+=4,i(),o+=r.substr(s,n-s);break;default:a(r.indexOf(">",n)-n+1),o+=i()+"|$)";break}break}else a(1),o+=i()+"|$)";break;case")":return++n,o;default:c(1);break}return o}return new RegExp(i(),t.flags)}function ic(t){return t.rules.find(e=>$e(e)&&e.entry)}function Ex(t){return t.rules.filter(e=>jt(e)&&e.hidden)}function oc(t,e){let r=new Set,n=ic(t);if(!n)return new Set(t.rules);let i=[n].concat(Ex(t));for(let s of i)Cx(s,r,e);let o=new Set;for(let s of t.rules)(r.has(s.name)||jt(s)&&s.hidden)&&o.add(s);return o}function Cx(t,e,r){e.add(t.name),hr(t).forEach(n=>{if(Zt(n)||r&&pl(n)){let i=n.rule.ref;i&&!e.has(i.name)&&Cx(i,e,r)}})}function Gw(t){let e=new Set;return hr(t).forEach(r=>{pr(r)&&($e(r.type.ref)&&e.add(r.type.ref),Ya(r.type.ref)&&$e(r.type.ref.$container)&&e.add(r.type.ref.$container))}),e}function sc(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=vl(t.type.ref);return e?.terminal}}function Vm(t){return t.hidden&&!nc(Un(t))}function zm(t,e){return!t||!e?[]:Xm(t,e,t.astNode,!0)}function ac(t,e,r){if(!t||!e)return;let n=Xm(t,e,t.astNode,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function Xm(t,e,r,n){if(!n){let i=mr(t.grammarSource,Pt);if(i&&i.feature===e)return[t]}return Lr(t)&&t.astNode===r?t.content.flatMap(i=>Xm(i,e,r,!1)):[]}function Hw(t,e){return t?Jm(t,e,t?.astNode):[]}function Ym(t,e,r){if(!t)return;let n=Jm(t,e,t?.astNode);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function Jm(t,e,r){if(t.astNode!==r)return[];if(pt(t.grammarSource)&&t.grammarSource.value===e)return[t];let n=Ci(t).iterator(),i,o=[];do if(i=n.next(),!i.done){let s=i.value;s.astNode===r?pt(s.grammarSource)&&s.grammarSource.value===e&&o.push(s):n.prune()}while(!i.done);return o}function Qm(t){var e;let r=t.astNode;for(;r===((e=t.container)===null||e===void 0?void 0:e.astNode);){let n=mr(t.grammarSource,Pt);if(n)return n;t=t.container}}function vl(t){let e=t;return Ya(e)&&(Fr(e.$container)?e=e.$container.$container:$e(e.$container)?e=e.$container:Vr(e.$container)),_x(t,e,new Map)}function _x(t,e,r){var n;function i(o,s){let a;return mr(o,Pt)||(a=_x(s,s,r)),r.set(t,a),a}if(r.has(t))return r.get(t);r.set(t,void 0);for(let o of hr(e)){if(Pt(o)&&o.feature.toLowerCase()==="name")return r.set(t,o),o;if(Zt(o)&&$e(o.rule.ref))return i(o,o.rule.ref);if(fl(o)&&(!((n=o.typeRef)===null||n===void 0)&&n.ref))return i(o,o.typeRef.ref)}}function Ax(t){let e=t.$container;if(Rr(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let o=r[i];if(Fr(o))return o;{let s=hr(r[i]).find(Fr);if(s)return s}}}if(wi(e))return Ax(e)}function Mi(t,e){return t==="?"||t==="*"||Rr(e)&&!!e.guardCondition}function Zm(t){return t==="*"||t==="+"}function Kw(t){return t==="+="}function cc(t){return kx(t,new Set)}function kx(t,e){if(e.has(t))return!0;e.add(t);for(let r of hr(t))if(Zt(r)){if(!r.rule.ref||$e(r.rule.ref)&&!kx(r.rule.ref,e))return!1}else{if(Pt(r))return!1;if(Fr(r))return!1}return!!t.definition}function Vw(t){return Km(t.type,new Set)}function Km(t,e){if(e.has(t))return!0;if(e.add(t),Tm(t))return!1;if(_m(t))return!1;if(km(t))return t.types.every(r=>Km(r,e));if(fl(t)){if(t.primitiveType!==void 0)return!0;if(t.stringType!==void 0)return!0;if(t.typeRef!==void 0){let r=t.typeRef.ref;return Ja(r)?Km(r.type,e):!1}else return!1}else return!1}function Xr(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if($e(e))return e.name;if(dl(e)||Ja(e))return e.name}}}function Li(t){var e;if($e(t))return cc(t)?t.name:(e=Xr(t))!==null&&e!==void 0?e:t.name;if(dl(t)||Ja(t)||Am(t))return t.name;if(Fr(t)){let r=wx(t);if(r)return r}else if(Ya(t))return t.name;throw new Error("Cannot get name of Unknown Type")}function wx(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return Li(t.type.ref)}function zw(t){var e,r,n;return jt(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":cc(t)?t.name:(n=Xr(t))!==null&&n!==void 0?n:t.name}function eh(t){var e,r,n;return jt(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":(n=Xr(t))!==null&&n!==void 0?n:t.name}function Un(t){let e={s:!1,i:!1,u:!1},r=us(t.definition,e),n=Object.entries(e).filter(([,i])=>i).map(([i])=>i).join("");return new RegExp(r,n)}var th=/[\s\S]/.source;function us(t,e){if(Im(t))return Xw(t);if(Dm(t))return Yw(t);if(wm(t))return Zw(t);if(pl(t)){let r=t.rule.ref;if(!r)throw new Error("Missing rule reference.");return yn(us(r.definition),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(Nm(t))return Qw(t);if($m(t))return Jw(t);if(Om(t)){let r=t.regex.lastIndexOf("/"),n=t.regex.substring(1,r),i=t.regex.substring(r+1);return e&&(e.i=i.includes("i"),e.s=i.includes("s"),e.u=i.includes("u")),yn(n,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}else{if(Mm(t))return yn(th,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}}function Xw(t){return yn(t.elements.map(e=>us(e)).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function Yw(t){return yn(t.elements.map(e=>us(e)).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function Jw(t){return yn(`${th}*?${us(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function Qw(t){return yn(`(?!${us(t.terminal)})${th}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function Zw(t){return t.right?yn(`[${Hm(t.left)}-${Hm(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):yn(Hm(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function Hm(t){return jn(t.value)}function yn(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function rh(t){let e=[],r=t.Grammar;for(let n of r.rules)jt(n)&&Vm(n)&&Wm(Un(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:cl}}var eP=typeof global=="object"&&global&&global.Object===Object&&global,Tl=eP;var tP=typeof self=="object"&&self&&self.Object===Object&&self,rP=Tl||tP||Function("return this")(),st=rP;var nP=st.Symbol,yt=nP;var Px=Object.prototype,iP=Px.hasOwnProperty,oP=Px.toString,uc=yt?yt.toStringTag:void 0;function sP(t){var e=iP.call(t,uc),r=t[uc];try{t[uc]=void 0;var n=!0}catch{}var i=oP.call(t);return n&&(e?t[uc]=r:delete t[uc]),i}var Nx=sP;var aP=Object.prototype,cP=aP.toString;function uP(t){return cP.call(t)}var Ox=uP;var lP="[object Null]",dP="[object Undefined]",Ix=yt?yt.toStringTag:void 0;function fP(t){return t==null?t===void 0?dP:lP:Ix&&Ix in Object(t)?Nx(t):Ox(t)}var Ut=fP;function pP(t){return t!=null&&typeof t=="object"}var rt=pP;var mP="[object Symbol]";function hP(t){return typeof t=="symbol"||rt(t)&&Ut(t)==mP}var Yr=hP;function gP(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}var Jr=gP;var yP=Array.isArray,q=yP;var vP=1/0,Dx=yt?yt.prototype:void 0,$x=Dx?Dx.toString:void 0;function Mx(t){if(typeof t=="string")return t;if(q(t))return Jr(t,Mx)+"";if(Yr(t))return $x?$x.call(t):"";var e=t+"";return e=="0"&&1/t==-vP?"-0":e}var Lx=Mx;var xP=/\s/;function TP(t){for(var e=t.length;e--&&xP.test(t.charAt(e)););return e}var Fx=TP;var RP=/^\s+/;function SP(t){return t&&t.slice(0,Fx(t)+1).replace(RP,"")}var qx=SP;function bP(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var Ge=bP;var jx=NaN,EP=/^[-+]0x[0-9a-f]+$/i,CP=/^0b[01]+$/i,_P=/^0o[0-7]+$/i,AP=parseInt;function kP(t){if(typeof t=="number")return t;if(Yr(t))return jx;if(Ge(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=Ge(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=qx(t);var r=CP.test(t);return r||_P.test(t)?AP(t.slice(2),r?2:8):EP.test(t)?jx:+t}var Ux=kP;var Bx=1/0,wP=17976931348623157e292;function PP(t){if(!t)return t===0?t:0;if(t=Ux(t),t===Bx||t===-Bx){var e=t<0?-1:1;return e*wP}return t===t?t:0}var Wx=PP;function NP(t){var e=Wx(t),r=e%1;return e===e?r?e-r:e:0}var Qr=NP;function OP(t){return t}var er=OP;var IP="[object AsyncFunction]",DP="[object Function]",$P="[object GeneratorFunction]",MP="[object Proxy]";function LP(t){if(!Ge(t))return!1;var e=Ut(t);return e==DP||e==$P||e==IP||e==MP}var Bt=LP;var FP=st["__core-js_shared__"],Rl=FP;var Gx=function(){var t=/[^.]+$/.exec(Rl&&Rl.keys&&Rl.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function qP(t){return!!Gx&&Gx in t}var Hx=qP;var jP=Function.prototype,UP=jP.toString;function BP(t){if(t!=null){try{return UP.call(t)}catch{}try{return t+""}catch{}}return""}var vn=BP;var WP=/[\\^$.*+?()[\]{}|]/g,GP=/^\[object .+?Constructor\]$/,HP=Function.prototype,KP=Object.prototype,VP=HP.toString,zP=KP.hasOwnProperty,XP=RegExp("^"+VP.call(zP).replace(WP,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function YP(t){if(!Ge(t)||Hx(t))return!1;var e=Bt(t)?XP:GP;return e.test(vn(t))}var Kx=YP;function JP(t,e){return t?.[e]}var Vx=JP;function QP(t,e){var r=Vx(t,e);return Kx(r)?r:void 0}var tr=QP;var ZP=tr(st,"WeakMap"),Sl=ZP;var zx=Object.create,eN=function(){function t(){}return function(e){if(!Ge(e))return{};if(zx)return zx(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),Xx=eN;function tN(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}var Yx=tN;function rN(){}var He=rN;function nN(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}var Jx=nN;var iN=800,oN=16,sN=Date.now;function aN(t){var e=0,r=0;return function(){var n=sN(),i=oN-(n-r);if(r=n,i>0){if(++e>=iN)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var Qx=aN;function cN(t){return function(){return t}}var Zx=cN;var uN=function(){try{var t=tr(Object,"defineProperty");return t({},"",{}),t}catch{}}(),ls=uN;var lN=ls?function(t,e){return ls(t,"toString",{configurable:!0,enumerable:!1,value:Zx(e),writable:!0})}:er,eT=lN;var dN=Qx(eT),tT=dN;function fN(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}var bl=fN;function pN(t,e,r,n){for(var i=t.length,o=r+(n?1:-1);n?o--:++o<i;)if(e(t[o],o,t))return o;return-1}var El=pN;function mN(t){return t!==t}var rT=mN;function hN(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}var nT=hN;function gN(t,e,r){return e===e?nT(t,e,r):El(t,rT,r)}var ds=gN;function yN(t,e){var r=t==null?0:t.length;return!!r&&ds(t,e,0)>-1}var Cl=yN;var vN=9007199254740991,xN=/^(?:0|[1-9]\d*)$/;function TN(t,e){var r=typeof t;return e=e??vN,!!e&&(r=="number"||r!="symbol"&&xN.test(t))&&t>-1&&t%1==0&&t<e}var Bn=TN;function RN(t,e,r){e=="__proto__"&&ls?ls(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}var fs=RN;function SN(t,e){return t===e||t!==t&&e!==e}var Zr=SN;var bN=Object.prototype,EN=bN.hasOwnProperty;function CN(t,e,r){var n=t[e];(!(EN.call(t,e)&&Zr(n,r))||r===void 0&&!(e in t))&&fs(t,e,r)}var Wn=CN;function _N(t,e,r,n){var i=!r;r||(r={});for(var o=-1,s=e.length;++o<s;){var a=e[o],c=n?n(r[a],t[a],a,r,t):void 0;c===void 0&&(c=t[a]),i?fs(r,a,c):Wn(r,a,c)}return r}var en=_N;var iT=Math.max;function AN(t,e,r){return e=iT(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,o=iT(n.length-e,0),s=Array(o);++i<o;)s[i]=n[e+i];i=-1;for(var a=Array(e+1);++i<e;)a[i]=n[i];return a[e]=r(s),Yx(t,this,a)}}var oT=AN;function kN(t,e){return tT(oT(t,e,er),t+"")}var ps=kN;var wN=9007199254740991;function PN(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=wN}var ms=PN;function NN(t){return t!=null&&ms(t.length)&&!Bt(t)}var at=NN;function ON(t,e,r){if(!Ge(r))return!1;var n=typeof e;return(n=="number"?at(r)&&Bn(e,r.length):n=="string"&&e in r)?Zr(r[e],t):!1}var Gn=ON;function IN(t){return ps(function(e,r){var n=-1,i=r.length,o=i>1?r[i-1]:void 0,s=i>2?r[2]:void 0;for(o=t.length>3&&typeof o=="function"?(i--,o):void 0,s&&Gn(r[0],r[1],s)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var a=r[n];a&&t(e,a,n,o)}return e})}var sT=IN;var DN=Object.prototype;function $N(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||DN;return t===r}var tn=$N;function MN(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}var aT=MN;var LN="[object Arguments]";function FN(t){return rt(t)&&Ut(t)==LN}var nh=FN;var cT=Object.prototype,qN=cT.hasOwnProperty,jN=cT.propertyIsEnumerable,UN=nh(function(){return arguments}())?nh:function(t){return rt(t)&&qN.call(t,"callee")&&!jN.call(t,"callee")},Hn=UN;function BN(){return!1}var uT=BN;var fT=typeof exports=="object"&&exports&&!exports.nodeType&&exports,lT=fT&&typeof module=="object"&&module&&!module.nodeType&&module,WN=lT&&lT.exports===fT,dT=WN?st.Buffer:void 0,GN=dT?dT.isBuffer:void 0,HN=GN||uT,xn=HN;var KN="[object Arguments]",VN="[object Array]",zN="[object Boolean]",XN="[object Date]",YN="[object Error]",JN="[object Function]",QN="[object Map]",ZN="[object Number]",eO="[object Object]",tO="[object RegExp]",rO="[object Set]",nO="[object String]",iO="[object WeakMap]",oO="[object ArrayBuffer]",sO="[object DataView]",aO="[object Float32Array]",cO="[object Float64Array]",uO="[object Int8Array]",lO="[object Int16Array]",dO="[object Int32Array]",fO="[object Uint8Array]",pO="[object Uint8ClampedArray]",mO="[object Uint16Array]",hO="[object Uint32Array]",Ne={};Ne[aO]=Ne[cO]=Ne[uO]=Ne[lO]=Ne[dO]=Ne[fO]=Ne[pO]=Ne[mO]=Ne[hO]=!0;Ne[KN]=Ne[VN]=Ne[oO]=Ne[zN]=Ne[sO]=Ne[XN]=Ne[YN]=Ne[JN]=Ne[QN]=Ne[ZN]=Ne[eO]=Ne[tO]=Ne[rO]=Ne[nO]=Ne[iO]=!1;function gO(t){return rt(t)&&ms(t.length)&&!!Ne[Ut(t)]}var pT=gO;function yO(t){return function(e){return t(e)}}var rn=yO;var mT=typeof exports=="object"&&exports&&!exports.nodeType&&exports,lc=mT&&typeof module=="object"&&module&&!module.nodeType&&module,vO=lc&&lc.exports===mT,ih=vO&&Tl.process,xO=function(){try{var t=lc&&lc.require&&lc.require("util").types;return t||ih&&ih.binding&&ih.binding("util")}catch{}}(),br=xO;var hT=br&&br.isTypedArray,TO=hT?rn(hT):pT,hs=TO;var RO=Object.prototype,SO=RO.hasOwnProperty;function bO(t,e){var r=q(t),n=!r&&Hn(t),i=!r&&!n&&xn(t),o=!r&&!n&&!i&&hs(t),s=r||n||i||o,a=s?aT(t.length,String):[],c=a.length;for(var u in t)(e||SO.call(t,u))&&!(s&&(u=="length"||i&&(u=="offset"||u=="parent")||o&&(u=="buffer"||u=="byteLength"||u=="byteOffset")||Bn(u,c)))&&a.push(u);return a}var _l=bO;function EO(t,e){return function(r){return t(e(r))}}var Al=EO;var CO=Al(Object.keys,Object),gT=CO;var _O=Object.prototype,AO=_O.hasOwnProperty;function kO(t){if(!tn(t))return gT(t);var e=[];for(var r in Object(t))AO.call(t,r)&&r!="constructor"&&e.push(r);return e}var kl=kO;function wO(t){return at(t)?_l(t):kl(t)}var Re=wO;var PO=Object.prototype,NO=PO.hasOwnProperty,OO=sT(function(t,e){if(tn(e)||at(e)){en(e,Re(e),t);return}for(var r in e)NO.call(e,r)&&Wn(t,r,e[r])}),Ct=OO;function IO(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var yT=IO;var DO=Object.prototype,$O=DO.hasOwnProperty;function MO(t){if(!Ge(t))return yT(t);var e=tn(t),r=[];for(var n in t)n=="constructor"&&(e||!$O.call(t,n))||r.push(n);return r}var vT=MO;function LO(t){return at(t)?_l(t,!0):vT(t)}var Kn=LO;var FO=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,qO=/^\w*$/;function jO(t,e){if(q(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||Yr(t)?!0:qO.test(t)||!FO.test(t)||e!=null&&t in Object(e)}var gs=jO;var UO=tr(Object,"create"),Tn=UO;function BO(){this.__data__=Tn?Tn(null):{},this.size=0}var xT=BO;function WO(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var TT=WO;var GO="__lodash_hash_undefined__",HO=Object.prototype,KO=HO.hasOwnProperty;function VO(t){var e=this.__data__;if(Tn){var r=e[t];return r===GO?void 0:r}return KO.call(e,t)?e[t]:void 0}var RT=VO;var zO=Object.prototype,XO=zO.hasOwnProperty;function YO(t){var e=this.__data__;return Tn?e[t]!==void 0:XO.call(e,t)}var ST=YO;var JO="__lodash_hash_undefined__";function QO(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=Tn&&e===void 0?JO:e,this}var bT=QO;function ys(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}ys.prototype.clear=xT;ys.prototype.delete=TT;ys.prototype.get=RT;ys.prototype.has=ST;ys.prototype.set=bT;var oh=ys;function ZO(){this.__data__=[],this.size=0}var ET=ZO;function eI(t,e){for(var r=t.length;r--;)if(Zr(t[r][0],e))return r;return-1}var Vn=eI;var tI=Array.prototype,rI=tI.splice;function nI(t){var e=this.__data__,r=Vn(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():rI.call(e,r,1),--this.size,!0}var CT=nI;function iI(t){var e=this.__data__,r=Vn(e,t);return r<0?void 0:e[r][1]}var _T=iI;function oI(t){return Vn(this.__data__,t)>-1}var AT=oI;function sI(t,e){var r=this.__data__,n=Vn(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}var kT=sI;function vs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}vs.prototype.clear=ET;vs.prototype.delete=CT;vs.prototype.get=_T;vs.prototype.has=AT;vs.prototype.set=kT;var zn=vs;var aI=tr(st,"Map"),Xn=aI;function cI(){this.size=0,this.__data__={hash:new oh,map:new(Xn||zn),string:new oh}}var wT=cI;function uI(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var PT=uI;function lI(t,e){var r=t.__data__;return PT(e)?r[typeof e=="string"?"string":"hash"]:r.map}var Yn=lI;function dI(t){var e=Yn(this,t).delete(t);return this.size-=e?1:0,e}var NT=dI;function fI(t){return Yn(this,t).get(t)}var OT=fI;function pI(t){return Yn(this,t).has(t)}var IT=pI;function mI(t,e){var r=Yn(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}var DT=mI;function xs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}xs.prototype.clear=wT;xs.prototype.delete=NT;xs.prototype.get=OT;xs.prototype.has=IT;xs.prototype.set=DT;var Fi=xs;var hI="Expected a function";function sh(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(hI);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=r.cache;if(o.has(i))return o.get(i);var s=t.apply(this,n);return r.cache=o.set(i,s)||o,s};return r.cache=new(sh.Cache||Fi),r}sh.Cache=Fi;var $T=sh;var gI=500;function yI(t){var e=$T(t,function(n){return r.size===gI&&r.clear(),n}),r=e.cache;return e}var MT=yI;var vI=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,xI=/\\(\\)?/g,TI=MT(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(vI,function(r,n,i,o){e.push(i?o.replace(xI,"$1"):n||r)}),e}),LT=TI;function RI(t){return t==null?"":Lx(t)}var FT=RI;function SI(t,e){return q(t)?t:gs(t,e)?[t]:LT(FT(t))}var Jn=SI;var bI=1/0;function EI(t){if(typeof t=="string"||Yr(t))return t;var e=t+"";return e=="0"&&1/t==-bI?"-0":e}var nn=EI;function CI(t,e){e=Jn(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[nn(e[r++])];return r&&r==n?t:void 0}var Ts=CI;function _I(t,e,r){var n=t==null?void 0:Ts(t,e);return n===void 0?r:n}var qT=_I;function AI(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}var Rs=AI;var jT=yt?yt.isConcatSpreadable:void 0;function kI(t){return q(t)||Hn(t)||!!(jT&&t&&t[jT])}var UT=kI;function BT(t,e,r,n,i){var o=-1,s=t.length;for(r||(r=UT),i||(i=[]);++o<s;){var a=t[o];e>0&&r(a)?e>1?BT(a,e-1,r,n,i):Rs(i,a):n||(i[i.length]=a)}return i}var Ss=BT;function wI(t){var e=t==null?0:t.length;return e?Ss(t,1):[]}var nt=wI;var PI=Al(Object.getPrototypeOf,Object),wl=PI;function NI(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var o=Array(i);++n<i;)o[n]=t[n+e];return o}var Pl=NI;function OI(t,e,r,n){var i=-1,o=t==null?0:t.length;for(n&&o&&(r=t[++i]);++i<o;)r=e(r,t[i],i,t);return r}var WT=OI;function II(){this.__data__=new zn,this.size=0}var GT=II;function DI(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}var HT=DI;function $I(t){return this.__data__.get(t)}var KT=$I;function MI(t){return this.__data__.has(t)}var VT=MI;var LI=200;function FI(t,e){var r=this.__data__;if(r instanceof zn){var n=r.__data__;if(!Xn||n.length<LI-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new Fi(n)}return r.set(t,e),this.size=r.size,this}var zT=FI;function bs(t){var e=this.__data__=new zn(t);this.size=e.size}bs.prototype.clear=GT;bs.prototype.delete=HT;bs.prototype.get=KT;bs.prototype.has=VT;bs.prototype.set=zT;var Qn=bs;function qI(t,e){return t&&en(e,Re(e),t)}var XT=qI;function jI(t,e){return t&&en(e,Kn(e),t)}var YT=jI;var eR=typeof exports=="object"&&exports&&!exports.nodeType&&exports,JT=eR&&typeof module=="object"&&module&&!module.nodeType&&module,UI=JT&&JT.exports===eR,QT=UI?st.Buffer:void 0,ZT=QT?QT.allocUnsafe:void 0;function BI(t,e){if(e)return t.slice();var r=t.length,n=ZT?ZT(r):new t.constructor(r);return t.copy(n),n}var tR=BI;function WI(t,e){for(var r=-1,n=t==null?0:t.length,i=0,o=[];++r<n;){var s=t[r];e(s,r,t)&&(o[i++]=s)}return o}var Es=WI;function GI(){return[]}var Nl=GI;var HI=Object.prototype,KI=HI.propertyIsEnumerable,rR=Object.getOwnPropertySymbols,VI=rR?function(t){return t==null?[]:(t=Object(t),Es(rR(t),function(e){return KI.call(t,e)}))}:Nl,Cs=VI;function zI(t,e){return en(t,Cs(t),e)}var nR=zI;var XI=Object.getOwnPropertySymbols,YI=XI?function(t){for(var e=[];t;)Rs(e,Cs(t)),t=wl(t);return e}:Nl,Ol=YI;function JI(t,e){return en(t,Ol(t),e)}var iR=JI;function QI(t,e,r){var n=e(t);return q(t)?n:Rs(n,r(t))}var Il=QI;function ZI(t){return Il(t,Re,Cs)}var dc=ZI;function eD(t){return Il(t,Kn,Ol)}var Dl=eD;var tD=tr(st,"DataView"),$l=tD;var rD=tr(st,"Promise"),Ml=rD;var nD=tr(st,"Set"),Zn=nD;var oR="[object Map]",iD="[object Object]",sR="[object Promise]",aR="[object Set]",cR="[object WeakMap]",uR="[object DataView]",oD=vn($l),sD=vn(Xn),aD=vn(Ml),cD=vn(Zn),uD=vn(Sl),qi=Ut;($l&&qi(new $l(new ArrayBuffer(1)))!=uR||Xn&&qi(new Xn)!=oR||Ml&&qi(Ml.resolve())!=sR||Zn&&qi(new Zn)!=aR||Sl&&qi(new Sl)!=cR)&&(qi=function(t){var e=Ut(t),r=e==iD?t.constructor:void 0,n=r?vn(r):"";if(n)switch(n){case oD:return uR;case sD:return oR;case aD:return sR;case cD:return aR;case uD:return cR}return e});var qr=qi;var lD=Object.prototype,dD=lD.hasOwnProperty;function fD(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&dD.call(t,"index")&&(r.index=t.index,r.input=t.input),r}var lR=fD;var pD=st.Uint8Array,_s=pD;function mD(t){var e=new t.constructor(t.byteLength);return new _s(e).set(new _s(t)),e}var As=mD;function hD(t,e){var r=e?As(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}var dR=hD;var gD=/\w*$/;function yD(t){var e=new t.constructor(t.source,gD.exec(t));return e.lastIndex=t.lastIndex,e}var fR=yD;var pR=yt?yt.prototype:void 0,mR=pR?pR.valueOf:void 0;function vD(t){return mR?Object(mR.call(t)):{}}var hR=vD;function xD(t,e){var r=e?As(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}var gR=xD;var TD="[object Boolean]",RD="[object Date]",SD="[object Map]",bD="[object Number]",ED="[object RegExp]",CD="[object Set]",_D="[object String]",AD="[object Symbol]",kD="[object ArrayBuffer]",wD="[object DataView]",PD="[object Float32Array]",ND="[object Float64Array]",OD="[object Int8Array]",ID="[object Int16Array]",DD="[object Int32Array]",$D="[object Uint8Array]",MD="[object Uint8ClampedArray]",LD="[object Uint16Array]",FD="[object Uint32Array]";function qD(t,e,r){var n=t.constructor;switch(e){case kD:return As(t);case TD:case RD:return new n(+t);case wD:return dR(t,r);case PD:case ND:case OD:case ID:case DD:case $D:case MD:case LD:case FD:return gR(t,r);case SD:return new n;case bD:case _D:return new n(t);case ED:return fR(t);case CD:return new n;case AD:return hR(t)}}var yR=qD;function jD(t){return typeof t.constructor=="function"&&!tn(t)?Xx(wl(t)):{}}var vR=jD;var UD="[object Map]";function BD(t){return rt(t)&&qr(t)==UD}var xR=BD;var TR=br&&br.isMap,WD=TR?rn(TR):xR,RR=WD;var GD="[object Set]";function HD(t){return rt(t)&&qr(t)==GD}var SR=HD;var bR=br&&br.isSet,KD=bR?rn(bR):SR,ER=KD;var VD=1,zD=2,XD=4,CR="[object Arguments]",YD="[object Array]",JD="[object Boolean]",QD="[object Date]",ZD="[object Error]",_R="[object Function]",e0="[object GeneratorFunction]",t0="[object Map]",r0="[object Number]",AR="[object Object]",n0="[object RegExp]",i0="[object Set]",o0="[object String]",s0="[object Symbol]",a0="[object WeakMap]",c0="[object ArrayBuffer]",u0="[object DataView]",l0="[object Float32Array]",d0="[object Float64Array]",f0="[object Int8Array]",p0="[object Int16Array]",m0="[object Int32Array]",h0="[object Uint8Array]",g0="[object Uint8ClampedArray]",y0="[object Uint16Array]",v0="[object Uint32Array]",Se={};Se[CR]=Se[YD]=Se[c0]=Se[u0]=Se[JD]=Se[QD]=Se[l0]=Se[d0]=Se[f0]=Se[p0]=Se[m0]=Se[t0]=Se[r0]=Se[AR]=Se[n0]=Se[i0]=Se[o0]=Se[s0]=Se[h0]=Se[g0]=Se[y0]=Se[v0]=!0;Se[ZD]=Se[_R]=Se[a0]=!1;function Ll(t,e,r,n,i,o){var s,a=e&VD,c=e&zD,u=e&XD;if(r&&(s=i?r(t,n,i,o):r(t)),s!==void 0)return s;if(!Ge(t))return t;var l=q(t);if(l){if(s=lR(t),!a)return Jx(t,s)}else{var d=qr(t),f=d==_R||d==e0;if(xn(t))return tR(t,a);if(d==AR||d==CR||f&&!i){if(s=c||f?{}:vR(t),!a)return c?iR(t,YT(s,t)):nR(t,XT(s,t))}else{if(!Se[d])return i?t:{};s=yR(t,d,a)}}o||(o=new Qn);var m=o.get(t);if(m)return m;o.set(t,s),ER(t)?t.forEach(function(C){s.add(Ll(C,e,r,C,t,o))}):RR(t)&&t.forEach(function(C,R){s.set(R,Ll(C,e,r,R,t,o))});var v=u?c?Dl:dc:c?Kn:Re,T=l?void 0:v(t);return bl(T||t,function(C,R){T&&(R=C,C=t[R]),Wn(s,R,Ll(C,e,r,R,t,o))}),s}var kR=Ll;var x0=4;function T0(t){return kR(t,x0)}var be=T0;function R0(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var o=t[e];o&&(i[n++]=o)}return i}var on=R0;var S0="__lodash_hash_undefined__";function b0(t){return this.__data__.set(t,S0),this}var wR=b0;function E0(t){return this.__data__.has(t)}var PR=E0;function Fl(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new Fi;++e<r;)this.add(t[e])}Fl.prototype.add=Fl.prototype.push=wR;Fl.prototype.has=PR;var ks=Fl;function C0(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}var ql=C0;function _0(t,e){return t.has(e)}var ws=_0;var A0=1,k0=2;function w0(t,e,r,n,i,o){var s=r&A0,a=t.length,c=e.length;if(a!=c&&!(s&&c>a))return!1;var u=o.get(t),l=o.get(e);if(u&&l)return u==e&&l==t;var d=-1,f=!0,m=r&k0?new ks:void 0;for(o.set(t,e),o.set(e,t);++d<a;){var v=t[d],T=e[d];if(n)var C=s?n(T,v,d,e,t,o):n(v,T,d,t,e,o);if(C!==void 0){if(C)continue;f=!1;break}if(m){if(!ql(e,function(R,g){if(!ws(m,g)&&(v===R||i(v,R,r,n,o)))return m.push(g)})){f=!1;break}}else if(!(v===T||i(v,T,r,n,o))){f=!1;break}}return o.delete(t),o.delete(e),f}var jl=w0;function P0(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}var NR=P0;function N0(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}var Ps=N0;var O0=1,I0=2,D0="[object Boolean]",$0="[object Date]",M0="[object Error]",L0="[object Map]",F0="[object Number]",q0="[object RegExp]",j0="[object Set]",U0="[object String]",B0="[object Symbol]",W0="[object ArrayBuffer]",G0="[object DataView]",OR=yt?yt.prototype:void 0,ah=OR?OR.valueOf:void 0;function H0(t,e,r,n,i,o,s){switch(r){case G0:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case W0:return!(t.byteLength!=e.byteLength||!o(new _s(t),new _s(e)));case D0:case $0:case F0:return Zr(+t,+e);case M0:return t.name==e.name&&t.message==e.message;case q0:case U0:return t==e+"";case L0:var a=NR;case j0:var c=n&O0;if(a||(a=Ps),t.size!=e.size&&!c)return!1;var u=s.get(t);if(u)return u==e;n|=I0,s.set(t,e);var l=jl(a(t),a(e),n,i,o,s);return s.delete(t),l;case B0:if(ah)return ah.call(t)==ah.call(e)}return!1}var IR=H0;var K0=1,V0=Object.prototype,z0=V0.hasOwnProperty;function X0(t,e,r,n,i,o){var s=r&K0,a=dc(t),c=a.length,u=dc(e),l=u.length;if(c!=l&&!s)return!1;for(var d=c;d--;){var f=a[d];if(!(s?f in e:z0.call(e,f)))return!1}var m=o.get(t),v=o.get(e);if(m&&v)return m==e&&v==t;var T=!0;o.set(t,e),o.set(e,t);for(var C=s;++d<c;){f=a[d];var R=t[f],g=e[f];if(n)var p=s?n(g,R,f,e,t,o):n(R,g,f,t,e,o);if(!(p===void 0?R===g||i(R,g,r,n,o):p)){T=!1;break}C||(C=f=="constructor")}if(T&&!C){var S=t.constructor,w=e.constructor;S!=w&&"constructor"in t&&"constructor"in e&&!(typeof S=="function"&&S instanceof S&&typeof w=="function"&&w instanceof w)&&(T=!1)}return o.delete(t),o.delete(e),T}var DR=X0;var Y0=1,$R="[object Arguments]",MR="[object Array]",Ul="[object Object]",J0=Object.prototype,LR=J0.hasOwnProperty;function Q0(t,e,r,n,i,o){var s=q(t),a=q(e),c=s?MR:qr(t),u=a?MR:qr(e);c=c==$R?Ul:c,u=u==$R?Ul:u;var l=c==Ul,d=u==Ul,f=c==u;if(f&&xn(t)){if(!xn(e))return!1;s=!0,l=!1}if(f&&!l)return o||(o=new Qn),s||hs(t)?jl(t,e,r,n,i,o):IR(t,e,c,r,n,i,o);if(!(r&Y0)){var m=l&&LR.call(t,"__wrapped__"),v=d&&LR.call(e,"__wrapped__");if(m||v){var T=m?t.value():t,C=v?e.value():e;return o||(o=new Qn),i(T,C,r,n,o)}}return f?(o||(o=new Qn),DR(t,e,r,n,i,o)):!1}var FR=Q0;function qR(t,e,r,n,i){return t===e?!0:t==null||e==null||!rt(t)&&!rt(e)?t!==t&&e!==e:FR(t,e,r,n,qR,i)}var Bl=qR;var Z0=1,e$=2;function t$(t,e,r,n){var i=r.length,o=i,s=!n;if(t==null)return!o;for(t=Object(t);i--;){var a=r[i];if(s&&a[2]?a[1]!==t[a[0]]:!(a[0]in t))return!1}for(;++i<o;){a=r[i];var c=a[0],u=t[c],l=a[1];if(s&&a[2]){if(u===void 0&&!(c in t))return!1}else{var d=new Qn;if(n)var f=n(u,l,c,t,e,d);if(!(f===void 0?Bl(l,u,Z0|e$,n,d):f))return!1}}return!0}var jR=t$;function r$(t){return t===t&&!Ge(t)}var Wl=r$;function n$(t){for(var e=Re(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,Wl(i)]}return e}var UR=n$;function i$(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}var Gl=i$;function o$(t){var e=UR(t);return e.length==1&&e[0][2]?Gl(e[0][0],e[0][1]):function(r){return r===t||jR(r,t,e)}}var BR=o$;function s$(t,e){return t!=null&&e in Object(t)}var WR=s$;function a$(t,e,r){e=Jn(e,t);for(var n=-1,i=e.length,o=!1;++n<i;){var s=nn(e[n]);if(!(o=t!=null&&r(t,s)))break;t=t[s]}return o||++n!=i?o:(i=t==null?0:t.length,!!i&&ms(i)&&Bn(s,i)&&(q(t)||Hn(t)))}var Hl=a$;function c$(t,e){return t!=null&&Hl(t,e,WR)}var GR=c$;var u$=1,l$=2;function d$(t,e){return gs(t)&&Wl(e)?Gl(nn(t),e):function(r){var n=qT(r,t);return n===void 0&&n===e?GR(r,t):Bl(e,n,u$|l$)}}var HR=d$;function f$(t){return function(e){return e?.[t]}}var KR=f$;function p$(t){return function(e){return Ts(e,t)}}var VR=p$;function m$(t){return gs(t)?KR(nn(t)):VR(t)}var zR=m$;function h$(t){return typeof t=="function"?t:t==null?er:typeof t=="object"?q(t)?HR(t[0],t[1]):BR(t):zR(t)}var Je=h$;function g$(t,e,r,n){for(var i=-1,o=t==null?0:t.length;++i<o;){var s=t[i];e(n,s,r(s),t)}return n}var XR=g$;function y$(t){return function(e,r,n){for(var i=-1,o=Object(e),s=n(e),a=s.length;a--;){var c=s[t?a:++i];if(r(o[c],c,o)===!1)break}return e}}var YR=y$;var v$=YR(),JR=v$;function x$(t,e){return t&&JR(t,e,Re)}var QR=x$;function T$(t,e){return function(r,n){if(r==null)return r;if(!at(r))return t(r,n);for(var i=r.length,o=e?i:-1,s=Object(r);(e?o--:++o<i)&&n(s[o],o,s)!==!1;);return r}}var ZR=T$;var R$=ZR(QR),rr=R$;function S$(t,e,r,n){return rr(t,function(i,o,s){e(n,i,r(i),s)}),n}var eS=S$;function b$(t,e){return function(r,n){var i=q(r)?XR:eS,o=e?e():{};return i(r,t,Je(n,2),o)}}var tS=b$;var rS=Object.prototype,E$=rS.hasOwnProperty,C$=ps(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&Gn(e[0],e[1],i)&&(n=1);++r<n;)for(var o=e[r],s=Kn(o),a=-1,c=s.length;++a<c;){var u=s[a],l=t[u];(l===void 0||Zr(l,rS[u])&&!E$.call(t,u))&&(t[u]=o[u])}return t}),Ns=C$;function _$(t){return rt(t)&&at(t)}var ch=_$;function A$(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}var Kl=A$;var k$=200;function w$(t,e,r,n){var i=-1,o=Cl,s=!0,a=t.length,c=[],u=e.length;if(!a)return c;r&&(e=Jr(e,rn(r))),n?(o=Kl,s=!1):e.length>=k$&&(o=ws,s=!1,e=new ks(e));e:for(;++i<a;){var l=t[i],d=r==null?l:r(l);if(l=n||l!==0?l:0,s&&d===d){for(var f=u;f--;)if(e[f]===d)continue e;c.push(l)}else o(e,d,n)||c.push(l)}return c}var nS=w$;var P$=ps(function(t,e){return ch(t)?nS(t,Ss(e,1,ch,!0)):[]}),ei=P$;function N$(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}var sn=N$;function O$(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Qr(e),Pl(t,e<0?0:e,n)):[]}var it=O$;function I$(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Qr(e),e=n-e,Pl(t,0,e<0?0:e)):[]}var Rn=I$;function D$(t){return typeof t=="function"?t:er}var iS=D$;function $$(t,e){var r=q(t)?bl:rr;return r(t,iS(e))}var D=$$;function M$(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}var oS=M$;function L$(t,e){var r=!0;return rr(t,function(n,i,o){return r=!!e(n,i,o),r}),r}var sS=L$;function F$(t,e,r){var n=q(t)?oS:sS;return r&&Gn(t,e,r)&&(e=void 0),n(t,Je(e,3))}var Nt=F$;function q$(t,e){var r=[];return rr(t,function(n,i,o){e(n,i,o)&&r.push(n)}),r}var Vl=q$;function j$(t,e){var r=q(t)?Es:Vl;return r(t,Je(e,3))}var vt=j$;function U$(t){return function(e,r,n){var i=Object(e);if(!at(e)){var o=Je(r,3);e=Re(e),r=function(a){return o(i[a],a,i)}}var s=t(e,r,n);return s>-1?i[o?e[s]:s]:void 0}}var aS=U$;var B$=Math.max;function W$(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Qr(r);return i<0&&(i=B$(n+i,0)),El(t,Je(e,3),i)}var cS=W$;var G$=aS(cS),an=G$;function H$(t){return t&&t.length?t[0]:void 0}var xt=H$;function K$(t,e){var r=-1,n=at(t)?Array(t.length):[];return rr(t,function(i,o,s){n[++r]=e(i,o,s)}),n}var uS=K$;function V$(t,e){var r=q(t)?Jr:uS;return r(t,Je(e,3))}var P=V$;function z$(t,e){return Ss(P(t,e),1)}var _t=z$;var X$=Object.prototype,Y$=X$.hasOwnProperty,J$=tS(function(t,e,r){Y$.call(t,r)?t[r].push(e):fs(t,r,[e])}),uh=J$;var Q$=Object.prototype,Z$=Q$.hasOwnProperty;function eM(t,e){return t!=null&&Z$.call(t,e)}var lS=eM;function tM(t,e){return t!=null&&Hl(t,e,lS)}var F=tM;var rM="[object String]";function nM(t){return typeof t=="string"||!q(t)&&rt(t)&&Ut(t)==rM}var mt=nM;function iM(t,e){return Jr(e,function(r){return t[r]})}var dS=iM;function oM(t){return t==null?[]:dS(t,Re(t))}var ge=oM;var sM=Math.max;function aM(t,e,r,n){t=at(t)?t:ge(t),r=r&&!n?Qr(r):0;var i=t.length;return r<0&&(r=sM(i+r,0)),mt(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&ds(t,e,r)>-1}var Me=aM;var cM=Math.max;function uM(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Qr(r);return i<0&&(i=cM(n+i,0)),ds(t,e,i)}var zl=uM;var lM="[object Map]",dM="[object Set]",fM=Object.prototype,pM=fM.hasOwnProperty;function mM(t){if(t==null)return!0;if(at(t)&&(q(t)||typeof t=="string"||typeof t.splice=="function"||xn(t)||hs(t)||Hn(t)))return!t.length;var e=qr(t);if(e==lM||e==dM)return!t.size;if(tn(t))return!kl(t).length;for(var r in t)if(pM.call(t,r))return!1;return!0}var Z=mM;var hM="[object RegExp]";function gM(t){return rt(t)&&Ut(t)==hM}var fS=gM;var pS=br&&br.isRegExp,yM=pS?rn(pS):fS,Er=yM;function vM(t){return t===void 0}var Ot=vM;function xM(t,e){return t<e}var mS=xM;function TM(t,e,r){for(var n=-1,i=t.length;++n<i;){var o=t[n],s=e(o);if(s!=null&&(a===void 0?s===s&&!Yr(s):r(s,a)))var a=s,c=o}return c}var hS=TM;function RM(t){return t&&t.length?hS(t,er,mS):void 0}var gS=RM;var SM="Expected a function";function bM(t){if(typeof t!="function")throw new TypeError(SM);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}var yS=bM;function EM(t,e,r,n){if(!Ge(t))return t;e=Jn(e,t);for(var i=-1,o=e.length,s=o-1,a=t;a!=null&&++i<o;){var c=nn(e[i]),u=r;if(c==="__proto__"||c==="constructor"||c==="prototype")return t;if(i!=s){var l=a[c];u=n?n(l,c,a):void 0,u===void 0&&(u=Ge(l)?l:Bn(e[i+1])?[]:{})}Wn(a,c,u),a=a[c]}return t}var vS=EM;function CM(t,e,r){for(var n=-1,i=e.length,o={};++n<i;){var s=e[n],a=Ts(t,s);r(a,s)&&vS(o,Jn(s,t),a)}return o}var xS=CM;function _M(t,e){if(t==null)return{};var r=Jr(Dl(t),function(n){return[n]});return e=Je(e),xS(t,r,function(n,i){return e(n,i[0])})}var nr=_M;function AM(t,e,r,n,i){return i(t,function(o,s,a){r=n?(n=!1,o):e(r,o,s,a)}),r}var TS=AM;function kM(t,e,r){var n=q(t)?WT:TS,i=arguments.length<3;return n(t,Je(e,4),r,i,rr)}var Ke=kM;function wM(t,e){var r=q(t)?Es:Vl;return r(t,yS(Je(e,3)))}var ti=wM;function PM(t,e){var r;return rr(t,function(n,i,o){return r=e(n,i,o),!r}),!!r}var RS=PM;function NM(t,e,r){var n=q(t)?ql:RS;return r&&Gn(t,e,r)&&(e=void 0),n(t,Je(e,3))}var fc=NM;var OM=1/0,IM=Zn&&1/Ps(new Zn([,-0]))[1]==OM?function(t){return new Zn(t)}:He,SS=IM;var DM=200;function $M(t,e,r){var n=-1,i=Cl,o=t.length,s=!0,a=[],c=a;if(r)s=!1,i=Kl;else if(o>=DM){var u=e?null:SS(t);if(u)return Ps(u);s=!1,i=ws,c=new ks}else c=e?[]:a;e:for(;++n<o;){var l=t[n],d=e?e(l):l;if(l=r||l!==0?l:0,s&&d===d){for(var f=c.length;f--;)if(c[f]===d)continue e;e&&c.push(d),a.push(l)}else i(c,d,r)||(c!==a&&c.push(d),a.push(l))}return a}var Xl=$M;function MM(t){return t&&t.length?Xl(t):[]}var Os=MM;function LM(t,e){return t&&t.length?Xl(t,Je(e,2)):[]}var bS=LM;function Is(t){console&&console.error&&console.error(`Error: ${t}`)}function pc(t){console&&console.warn&&console.warn(`Warning: ${t}`)}function mc(t){let e=new Date().getTime(),r=t();return{time:new Date().getTime()-e,value:r}}function hc(t){function e(){}e.prototype=t;let r=new e;function n(){return typeof r.bar}return n(),n(),t;(0,eval)(t)}function FM(t){return qM(t)?t.LABEL:t.name}function qM(t){return mt(t.LABEL)&&t.LABEL!==""}var gr=class{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){this._definition=e}accept(e){e.visit(this),D(this.definition,r=>{r.accept(e)})}},pe=class extends gr{constructor(e){super([]),this.idx=1,Ct(this,nr(e,r=>r!==void 0))}set definition(e){}get definition(){return this.referencedRule!==void 0?this.referencedRule.definition:[]}accept(e){e.visit(this)}},Wt=class extends gr{constructor(e){super(e.definition),this.orgText="",Ct(this,nr(e,r=>r!==void 0))}},Ee=class extends gr{constructor(e){super(e.definition),this.ignoreAmbiguities=!1,Ct(this,nr(e,r=>r!==void 0))}},me=class extends gr{constructor(e){super(e.definition),this.idx=1,Ct(this,nr(e,r=>r!==void 0))}},Ce=class extends gr{constructor(e){super(e.definition),this.idx=1,Ct(this,nr(e,r=>r!==void 0))}},_e=class extends gr{constructor(e){super(e.definition),this.idx=1,Ct(this,nr(e,r=>r!==void 0))}},se=class extends gr{constructor(e){super(e.definition),this.idx=1,Ct(this,nr(e,r=>r!==void 0))}},ve=class extends gr{constructor(e){super(e.definition),this.idx=1,Ct(this,nr(e,r=>r!==void 0))}},xe=class extends gr{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){super(e.definition),this.idx=1,this.ignoreAmbiguities=!1,this.hasPredicates=!1,Ct(this,nr(e,r=>r!==void 0))}},te=class{constructor(e){this.idx=1,Ct(this,nr(e,r=>r!==void 0))}accept(e){e.visit(this)}};function Yl(t){return P(t,Ds)}function Ds(t){function e(r){return P(r,Ds)}if(t instanceof pe){let r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return mt(t.label)&&(r.label=t.label),r}else{if(t instanceof Ee)return{type:"Alternative",definition:e(t.definition)};if(t instanceof me)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof Ce)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof _e)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:Ds(new te({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof ve)return{type:"RepetitionWithSeparator",idx:t.idx,separator:Ds(new te({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof se)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof xe)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof te){let r={type:"Terminal",name:t.terminalType.name,label:FM(t.terminalType),idx:t.idx};mt(t.label)&&(r.terminalLabel=t.label);let n=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(r.pattern=Er(n)?n.source:n),r}else{if(t instanceof Wt)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}var Gt=class{visit(e){let r=e;switch(r.constructor){case pe:return this.visitNonTerminal(r);case Ee:return this.visitAlternative(r);case me:return this.visitOption(r);case Ce:return this.visitRepetitionMandatory(r);case _e:return this.visitRepetitionMandatoryWithSeparator(r);case ve:return this.visitRepetitionWithSeparator(r);case se:return this.visitRepetition(r);case xe:return this.visitAlternation(r);case te:return this.visitTerminal(r);case Wt:return this.visitRule(r);default:throw Error("non exhaustive match")}}visitNonTerminal(e){}visitAlternative(e){}visitOption(e){}visitRepetition(e){}visitRepetitionMandatory(e){}visitRepetitionMandatoryWithSeparator(e){}visitRepetitionWithSeparator(e){}visitAlternation(e){}visitTerminal(e){}visitRule(e){}};function lh(t){return t instanceof Ee||t instanceof me||t instanceof se||t instanceof Ce||t instanceof _e||t instanceof ve||t instanceof te||t instanceof Wt}function ji(t,e=[]){return t instanceof me||t instanceof se||t instanceof ve?!0:t instanceof xe?fc(t.definition,n=>ji(n,e)):t instanceof pe&&Me(e,t)?!1:t instanceof gr?(t instanceof pe&&e.push(t),Nt(t.definition,n=>ji(n,e))):!1}function dh(t){return t instanceof xe}function ir(t){if(t instanceof pe)return"SUBRULE";if(t instanceof me)return"OPTION";if(t instanceof xe)return"OR";if(t instanceof Ce)return"AT_LEAST_ONE";if(t instanceof _e)return"AT_LEAST_ONE_SEP";if(t instanceof ve)return"MANY_SEP";if(t instanceof se)return"MANY";if(t instanceof te)return"CONSUME";throw Error("non exhaustive match")}var Sn=class{walk(e,r=[]){D(e.definition,(n,i)=>{let o=it(e.definition,i+1);if(n instanceof pe)this.walkProdRef(n,o,r);else if(n instanceof te)this.walkTerminal(n,o,r);else if(n instanceof Ee)this.walkFlat(n,o,r);else if(n instanceof me)this.walkOption(n,o,r);else if(n instanceof Ce)this.walkAtLeastOne(n,o,r);else if(n instanceof _e)this.walkAtLeastOneSep(n,o,r);else if(n instanceof ve)this.walkManySep(n,o,r);else if(n instanceof se)this.walkMany(n,o,r);else if(n instanceof xe)this.walkOr(n,o,r);else throw Error("non exhaustive match")})}walkTerminal(e,r,n){}walkProdRef(e,r,n){}walkFlat(e,r,n){let i=r.concat(n);this.walk(e,i)}walkOption(e,r,n){let i=r.concat(n);this.walk(e,i)}walkAtLeastOne(e,r,n){let i=[new me({definition:e.definition})].concat(r,n);this.walk(e,i)}walkAtLeastOneSep(e,r,n){let i=ES(e,r,n);this.walk(e,i)}walkMany(e,r,n){let i=[new me({definition:e.definition})].concat(r,n);this.walk(e,i)}walkManySep(e,r,n){let i=ES(e,r,n);this.walk(e,i)}walkOr(e,r,n){let i=r.concat(n);D(e.definition,o=>{let s=new Ee({definition:[o]});this.walk(s,i)})}};function ES(t,e,r){return[new me({definition:[new te({terminalType:t.separator})].concat(t.definition)})].concat(e,r)}function Ui(t){if(t instanceof pe)return Ui(t.referencedRule);if(t instanceof te)return BM(t);if(lh(t))return jM(t);if(dh(t))return UM(t);throw Error("non exhaustive match")}function jM(t){let e=[],r=t.definition,n=0,i=r.length>n,o,s=!0;for(;i&&s;)o=r[n],s=ji(o),e=e.concat(Ui(o)),n=n+1,i=r.length>n;return Os(e)}function UM(t){let e=P(t.definition,r=>Ui(r));return Os(nt(e))}function BM(t){return[t.terminalType]}var Jl="_~IN~_";var fh=class extends Sn{constructor(e){super(),this.topProd=e,this.follows={}}startWalking(){return this.walk(this.topProd),this.follows}walkTerminal(e,r,n){}walkProdRef(e,r,n){let i=WM(e.referencedRule,e.idx)+this.topProd.name,o=r.concat(n),s=new Ee({definition:o}),a=Ui(s);this.follows[i]=a}};function CS(t){let e={};return D(t,r=>{let n=new fh(r).startWalking();Ct(e,n)}),e}function WM(t,e){return t.name+e+Jl}var Ql={},GM=new Di;function $s(t){let e=t.toString();if(Ql.hasOwnProperty(e))return Ql[e];{let r=GM.pattern(e);return Ql[e]=r,r}}function _S(){Ql={}}var kS="Complement Sets are not supported for first char optimization",gc=`Unable to use "first char" lexer optimizations:
`;function wS(t,e=!1){try{let r=$s(t);return ph(r.value,{},r.flags.ignoreCase)}catch(r){if(r.message===kS)e&&pc(`${gc}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{let n="";e&&(n=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),Is(`${gc}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues`+n)}}return[]}function ph(t,e,r){switch(t.type){case"Disjunction":for(let i=0;i<t.value.length;i++)ph(t.value[i],e,r);break;case"Alternative":let n=t.value;for(let i=0;i<n.length;i++){let o=n[i];switch(o.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}let s=o;switch(s.type){case"Character":Zl(s.value,e,r);break;case"Set":if(s.complement===!0)throw Error(kS);D(s.value,c=>{if(typeof c=="number")Zl(c,e,r);else{let u=c;if(r===!0)for(let l=u.from;l<=u.to;l++)Zl(l,e,r);else{for(let l=u.from;l<=u.to&&l<Ms;l++)Zl(l,e,r);if(u.to>=Ms){let l=u.from>=Ms?u.from:Ms,d=u.to,f=cn(l),m=cn(d);for(let v=f;v<=m;v++)e[v]=v}}}});break;case"Group":ph(s.value,e,r);break;default:throw Error("Non Exhaustive Match")}let a=s.quantifier!==void 0&&s.quantifier.atLeast===0;if(s.type==="Group"&&mh(s)===!1||s.type!=="Group"&&a===!1)break}break;default:throw Error("non exhaustive match!")}return ge(e)}function Zl(t,e,r){let n=cn(t);e[n]=n,r===!0&&HM(t,e)}function HM(t,e){let r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){let i=cn(n.charCodeAt(0));e[i]=i}else{let i=r.toLowerCase();if(i!==r){let o=cn(i.charCodeAt(0));e[o]=o}}}function AS(t,e){return an(t.value,r=>{if(typeof r=="number")return Me(e,r);{let n=r;return an(e,i=>n.from<=i&&i<=n.to)!==void 0}})}function mh(t){let e=t.quantifier;return e&&e.atLeast===0?!0:t.value?q(t.value)?Nt(t.value,mh):mh(t.value):!1}var hh=class extends zr{constructor(e){super(),this.targetCharCodes=e,this.found=!1}visitChildren(e){if(this.found!==!0){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}super.visitChildren(e)}}visitCharacter(e){Me(this.targetCharCodes,e.value)&&(this.found=!0)}visitSet(e){e.complement?AS(e,this.targetCharCodes)===void 0&&(this.found=!0):AS(e,this.targetCharCodes)!==void 0&&(this.found=!0)}};function ed(t,e){if(e instanceof RegExp){let r=$s(e),n=new hh(t);return n.visit(r),n.found}else return an(e,r=>Me(t,r.charCodeAt(0)))!==void 0}var Bi="PATTERN",Ls="defaultMode",td="modes",yh=typeof new RegExp("(?:)").sticky=="boolean";function OS(t,e){e=Ns(e,{useSticky:yh,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:(g,p)=>p()});let r=e.tracer;r("initCharCodeToOptimizedIndexMap",()=>{uL()});let n;r("Reject Lexer.NA",()=>{n=ti(t,g=>g[Bi]===Fe.NA)});let i=!1,o;r("Transform Patterns",()=>{i=!1,o=P(n,g=>{let p=g[Bi];if(Er(p)){let S=p.source;return S.length===1&&S!=="^"&&S!=="$"&&S!=="."&&!p.ignoreCase?S:S.length===2&&S[0]==="\\"&&!Me(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],S[1])?S[1]:e.useSticky?NS(p):PS(p)}else{if(Bt(p))return i=!0,{exec:p};if(typeof p=="object")return i=!0,p;if(typeof p=="string"){if(p.length===1)return p;{let S=p.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),w=new RegExp(S);return e.useSticky?NS(w):PS(w)}}else throw Error("non exhaustive match")}})});let s,a,c,u,l;r("misc mapping",()=>{s=P(n,g=>g.tokenTypeIdx),a=P(n,g=>{let p=g.GROUP;if(p!==Fe.SKIPPED){if(mt(p))return p;if(Ot(p))return!1;throw Error("non exhaustive match")}}),c=P(n,g=>{let p=g.LONGER_ALT;if(p)return q(p)?P(p,w=>zl(n,w)):[zl(n,p)]}),u=P(n,g=>g.PUSH_MODE),l=P(n,g=>F(g,"POP_MODE"))});let d;r("Line Terminator Handling",()=>{let g=jS(e.lineTerminatorCharacters);d=P(n,p=>!1),e.positionTracking!=="onlyOffset"&&(d=P(n,p=>F(p,"LINE_BREAKS")?!!p.LINE_BREAKS:qS(p,g)===!1&&ed(g,p.PATTERN)))});let f,m,v,T;r("Misc Mapping #2",()=>{f=P(n,LS),m=P(o,aL),v=Ke(n,(g,p)=>{let S=p.GROUP;return mt(S)&&S!==Fe.SKIPPED&&(g[S]=[]),g},{}),T=P(o,(g,p)=>({pattern:o[p],longerAlt:c[p],canLineTerminator:d[p],isCustom:f[p],short:m[p],group:a[p],push:u[p],pop:l[p],tokenTypeIdx:s[p],tokenType:n[p]}))});let C=!0,R=[];return e.safeMode||r("First Char Optimization",()=>{R=Ke(n,(g,p,S)=>{if(typeof p.PATTERN=="string"){let w=p.PATTERN.charCodeAt(0),Q=cn(w);gh(g,Q,T[S])}else if(q(p.START_CHARS_HINT)){let w;D(p.START_CHARS_HINT,Q=>{let Vt=typeof Q=="string"?Q.charCodeAt(0):Q,et=cn(Vt);w!==et&&(w=et,gh(g,et,T[S]))})}else if(Er(p.PATTERN))if(p.PATTERN.unicode)C=!1,e.ensureOptimizations&&Is(`${gc}	Unable to analyze < ${p.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{let w=wS(p.PATTERN,e.ensureOptimizations);Z(w)&&(C=!1),D(w,Q=>{gh(g,Q,T[S])})}else e.ensureOptimizations&&Is(`${gc}	TokenType: <${p.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),C=!1;return g},[])}),{emptyGroups:v,patternIdxToConfig:T,charCodeToPatternIdxToConfig:R,hasCustom:i,canBeOptimized:C}}function IS(t,e){let r=[],n=VM(t);r=r.concat(n.errors);let i=zM(n.valid),o=i.valid;return r=r.concat(i.errors),r=r.concat(KM(o)),r=r.concat(rL(o)),r=r.concat(nL(o,e)),r=r.concat(iL(o)),r}function KM(t){let e=[],r=vt(t,n=>Er(n[Bi]));return e=e.concat(YM(r)),e=e.concat(ZM(r)),e=e.concat(eL(r)),e=e.concat(tL(r)),e=e.concat(JM(r)),e}function VM(t){let e=vt(t,i=>!F(i,Bi)),r=P(e,i=>({message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:Le.MISSING_PATTERN,tokenTypes:[i]})),n=ei(t,e);return{errors:r,valid:n}}function zM(t){let e=vt(t,i=>{let o=i[Bi];return!Er(o)&&!Bt(o)&&!F(o,"exec")&&!mt(o)}),r=P(e,i=>({message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:Le.INVALID_PATTERN,tokenTypes:[i]})),n=ei(t,e);return{errors:r,valid:n}}var XM=/[^\\][$]/;function YM(t){class e extends zr{constructor(){super(...arguments),this.found=!1}visitEndAnchor(o){this.found=!0}}let r=vt(t,i=>{let o=i.PATTERN;try{let s=$s(o),a=new e;return a.visit(s),a.found}catch{return XM.test(o.source)}});return P(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:Le.EOI_ANCHOR_FOUND,tokenTypes:[i]}))}function JM(t){let e=vt(t,n=>n.PATTERN.test(""));return P(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:Le.EMPTY_MATCH_PATTERN,tokenTypes:[n]}))}var QM=/[^\\[][\^]|^\^/;function ZM(t){class e extends zr{constructor(){super(...arguments),this.found=!1}visitStartAnchor(o){this.found=!0}}let r=vt(t,i=>{let o=i.PATTERN;try{let s=$s(o),a=new e;return a.visit(s),a.found}catch{return QM.test(o.source)}});return P(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:Le.SOI_ANCHOR_FOUND,tokenTypes:[i]}))}function eL(t){let e=vt(t,n=>{let i=n[Bi];return i instanceof RegExp&&(i.multiline||i.global)});return P(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:Le.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}))}function tL(t){let e=[],r=P(t,o=>Ke(t,(s,a)=>(o.PATTERN.source===a.PATTERN.source&&!Me(e,a)&&a.PATTERN!==Fe.NA&&(e.push(a),s.push(a)),s),[]));r=on(r);let n=vt(r,o=>o.length>1);return P(n,o=>{let s=P(o,c=>c.name);return{message:`The same RegExp pattern ->${xt(o).PATTERN}<-has been used in all of the following Token Types: ${s.join(", ")} <-`,type:Le.DUPLICATE_PATTERNS_FOUND,tokenTypes:o}})}function rL(t){let e=vt(t,n=>{if(!F(n,"GROUP"))return!1;let i=n.GROUP;return i!==Fe.SKIPPED&&i!==Fe.NA&&!mt(i)});return P(e,n=>({message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:Le.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}))}function nL(t,e){let r=vt(t,i=>i.PUSH_MODE!==void 0&&!Me(e,i.PUSH_MODE));return P(r,i=>({message:`Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,type:Le.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}))}function iL(t){let e=[],r=Ke(t,(n,i,o)=>{let s=i.PATTERN;return s===Fe.NA||(mt(s)?n.push({str:s,idx:o,tokenType:i}):Er(s)&&sL(s)&&n.push({str:s.source,idx:o,tokenType:i})),n},[]);return D(t,(n,i)=>{D(r,({str:o,idx:s,tokenType:a})=>{if(i<s&&oL(o,n.PATTERN)){let c=`Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:c,type:Le.UNREACHABLE_PATTERN,tokenTypes:[n,a]})}})}),e}function oL(t,e){if(Er(e)){let r=e.exec(t);return r!==null&&r.index===0}else{if(Bt(e))return e(t,0,[],{});if(F(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function sL(t){return an([".","\\","[","]","|","^","$","(",")","?","*","+","{"],r=>t.source.indexOf(r)!==-1)===void 0}function PS(t){let e=t.ignoreCase?"i":"";return new RegExp(`^(?:${t.source})`,e)}function NS(t){let e=t.ignoreCase?"iy":"y";return new RegExp(`${t.source}`,e)}function DS(t,e,r){let n=[];return F(t,Ls)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+Ls+`> property in its definition
`,type:Le.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),F(t,td)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+td+`> property in its definition
`,type:Le.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),F(t,td)&&F(t,Ls)&&!F(t.modes,t.defaultMode)&&n.push({message:`A MultiMode Lexer cannot be initialized with a ${Ls}: <${t.defaultMode}>which does not exist
`,type:Le.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),F(t,td)&&D(t.modes,(i,o)=>{D(i,(s,a)=>{if(Ot(s))n.push({message:`A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${a}>
`,type:Le.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if(F(s,"LONGER_ALT")){let c=q(s.LONGER_ALT)?s.LONGER_ALT:[s.LONGER_ALT];D(c,u=>{!Ot(u)&&!Me(i,u)&&n.push({message:`A MultiMode Lexer cannot be initialized with a longer_alt <${u.name}> on token <${s.name}> outside of mode <${o}>
`,type:Le.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}function $S(t,e,r){let n=[],i=!1,o=on(nt(ge(t.modes))),s=ti(o,c=>c[Bi]===Fe.NA),a=jS(r);return e&&D(s,c=>{let u=qS(c,a);if(u!==!1){let d={message:cL(c,u),type:u.issue,tokenType:c};n.push(d)}else F(c,"LINE_BREAKS")?c.LINE_BREAKS===!0&&(i=!0):ed(a,c.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:Le.NO_LINE_BREAKS_FLAGS}),n}function MS(t){let e={},r=Re(t);return D(r,n=>{let i=t[n];if(q(i))e[n]=[];else throw Error("non exhaustive match")}),e}function LS(t){let e=t.PATTERN;if(Er(e))return!1;if(Bt(e))return!0;if(F(e,"exec"))return!0;if(mt(e))return!1;throw Error("non exhaustive match")}function aL(t){return mt(t)&&t.length===1?t.charCodeAt(0):!1}var FS={test:function(t){let e=t.length;for(let r=this.lastIndex;r<e;r++){let n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function qS(t,e){if(F(t,"LINE_BREAKS"))return!1;if(Er(t.PATTERN)){try{ed(e,t.PATTERN)}catch(r){return{issue:Le.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if(mt(t.PATTERN))return!1;if(LS(t))return{issue:Le.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function cL(t,e){if(e.issue===Le.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;if(e.issue===Le.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;throw Error("non exhaustive match")}function jS(t){return P(t,r=>mt(r)?r.charCodeAt(0):r)}function gh(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}var Ms=256,rd=[];function cn(t){return t<Ms?t:rd[t]}function uL(){if(Z(rd)){rd=new Array(65536);for(let t=0;t<65536;t++)rd[t]=t>255?255+~~(t/255):t}}function bn(t,e){let r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}function Fs(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}var US=1,WS={};function En(t){let e=lL(t);dL(e),pL(e),fL(e),D(e,r=>{r.isParent=r.categoryMatches.length>0})}function lL(t){let e=be(t),r=t,n=!0;for(;n;){r=on(nt(P(r,o=>o.CATEGORIES)));let i=ei(r,e);e=e.concat(i),Z(i)?n=!1:r=i}return e}function dL(t){D(t,e=>{vh(e)||(WS[US]=e,e.tokenTypeIdx=US++),BS(e)&&!q(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),BS(e)||(e.CATEGORIES=[]),mL(e)||(e.categoryMatches=[]),hL(e)||(e.categoryMatchesMap={})})}function fL(t){D(t,e=>{e.categoryMatches=[],D(e.categoryMatchesMap,(r,n)=>{e.categoryMatches.push(WS[n].tokenTypeIdx)})})}function pL(t){D(t,e=>{GS([],e)})}function GS(t,e){D(t,r=>{e.categoryMatchesMap[r.tokenTypeIdx]=!0}),D(e.CATEGORIES,r=>{let n=t.concat(e);Me(n,r)||GS(n,r)})}function vh(t){return F(t,"tokenTypeIdx")}function BS(t){return F(t,"CATEGORIES")}function mL(t){return F(t,"categoryMatches")}function hL(t){return F(t,"categoryMatchesMap")}function HS(t){return F(t,"tokenTypeIdx")}var qs={buildUnableToPopLexerModeMessage(t){return`Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`},buildUnexpectedCharactersMessage(t,e,r,n,i){return`unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${r} characters.`}};var Le;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(Le||(Le={}));var yc={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:qs,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(yc);var Fe=class{constructor(e,r=yc){if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=(i,o)=>{if(this.traceInitPerf===!0){this.traceInitIndent++;let s=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${s}--> <${i}>`);let{time:a,value:c}=mc(o),u=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&u(`${s}<-- <${i}> time: ${a}ms`),this.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=Ct({},yc,r);let n=this.config.traceInitPerf;n===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof n=="number"&&(this.traceInitMaxIdent=n,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",()=>{let i,o=!0;this.TRACE_INIT("Lexer Config handling",()=>{if(this.config.lineTerminatorsPattern===yc.lineTerminatorsPattern)this.config.lineTerminatorsPattern=FS;else if(this.config.lineTerminatorCharacters===yc.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');this.trackStartLines=/full|onlyStart/i.test(this.config.positionTracking),this.trackEndLines=/full/i.test(this.config.positionTracking),q(e)?i={modes:{defaultMode:be(e)},defaultMode:Ls}:(o=!1,i=be(e))}),this.config.skipValidations===!1&&(this.TRACE_INIT("performRuntimeChecks",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(DS(i,this.trackStartLines,this.config.lineTerminatorCharacters))}),this.TRACE_INIT("performWarningRuntimeChecks",()=>{this.lexerDefinitionWarning=this.lexerDefinitionWarning.concat($S(i,this.trackStartLines,this.config.lineTerminatorCharacters))})),i.modes=i.modes?i.modes:{},D(i.modes,(a,c)=>{i.modes[c]=ti(a,u=>Ot(u))});let s=Re(i.modes);if(D(i.modes,(a,c)=>{this.TRACE_INIT(`Mode: <${c}> processing`,()=>{if(this.modes.push(c),this.config.skipValidations===!1&&this.TRACE_INIT("validatePatterns",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(IS(a,s))}),Z(this.lexerDefinitionErrors)){En(a);let u;this.TRACE_INIT("analyzeTokenTypes",()=>{u=OS(a,{lineTerminatorCharacters:this.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:this.TRACE_INIT})}),this.patternIdxToConfig[c]=u.patternIdxToConfig,this.charCodeToPatternIdxToConfig[c]=u.charCodeToPatternIdxToConfig,this.emptyGroups=Ct({},this.emptyGroups,u.emptyGroups),this.hasCustom=u.hasCustom||this.hasCustom,this.canModeBeOptimized[c]=u.canBeOptimized}})}),this.defaultMode=i.defaultMode,!Z(this.lexerDefinitionErrors)&&!this.config.deferDefinitionErrorsHandling){let c=P(this.lexerDefinitionErrors,u=>u.message).join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+c)}D(this.lexerDefinitionWarning,a=>{pc(a.message)}),this.TRACE_INIT("Choosing sub-methods implementations",()=>{if(yh?(this.chopInput=er,this.match=this.matchWithTest):(this.updateLastIndex=He,this.match=this.matchWithExec),o&&(this.handleModes=He),this.trackStartLines===!1&&(this.computeNewColumn=er),this.trackEndLines===!1&&(this.updateTokenEndLineColumnLocation=He),/full/i.test(this.config.positionTracking))this.createTokenInstance=this.createFullToken;else if(/onlyStart/i.test(this.config.positionTracking))this.createTokenInstance=this.createStartOnlyToken;else if(/onlyOffset/i.test(this.config.positionTracking))this.createTokenInstance=this.createOffsetOnlyToken;else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);this.hasCustom?(this.addToken=this.addTokenUsingPush,this.handlePayload=this.handlePayloadWithCustom):(this.addToken=this.addTokenUsingMemberAccess,this.handlePayload=this.handlePayloadNoCustom)}),this.TRACE_INIT("Failed Optimization Warnings",()=>{let a=Ke(this.canModeBeOptimized,(c,u,l)=>(u===!1&&c.push(l),c),[]);if(r.ensureOptimizations&&!Z(a))throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),this.TRACE_INIT("clearRegExpParserCache",()=>{_S()}),this.TRACE_INIT("toFastProperties",()=>{hc(this)})})}tokenize(e,r=this.defaultMode){if(!Z(this.lexerDefinitionErrors)){let i=P(this.lexerDefinitionErrors,o=>o.message).join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)}tokenizeInternal(e,r){let n,i,o,s,a,c,u,l,d,f,m,v,T,C,R,g,p=e,S=p.length,w=0,Q=0,Vt=this.hasCustom?0:Math.floor(e.length/10),et=new Array(Vt),dr=[],zt=this.trackStartLines?1:void 0,I=this.trackStartLines?1:void 0,_=MS(this.emptyGroups),j=this.trackStartLines,M=this.config.lineTerminatorsPattern,oe=0,z=[],H=[],dt=[],L=[];Object.freeze(L);let b;function Te(){return z}function rl(gt){let Yt=cn(gt),Mn=H[Yt];return Mn===void 0?L:Mn}let lm=gt=>{if(dt.length===1&&gt.tokenType.PUSH_MODE===void 0){let Yt=this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(gt);dr.push({offset:gt.startOffset,line:gt.startLine,column:gt.startColumn,length:gt.image.length,message:Yt})}else{dt.pop();let Yt=sn(dt);z=this.patternIdxToConfig[Yt],H=this.charCodeToPatternIdxToConfig[Yt],oe=z.length;let Mn=this.canModeBeOptimized[Yt]&&this.config.safeMode===!1;H&&Mn?b=rl:b=Te}};function La(gt){dt.push(gt),H=this.charCodeToPatternIdxToConfig[gt],z=this.patternIdxToConfig[gt],oe=z.length,oe=z.length;let Yt=this.canModeBeOptimized[gt]&&this.config.safeMode===!1;H&&Yt?b=rl:b=Te}La.call(this,r);let Xt,nl=this.config.recoveryEnabled;for(;w<S;){c=null;let gt=p.charCodeAt(w),Yt=b(gt),Mn=Yt.length;for(n=0;n<Mn;n++){Xt=Yt[n];let Ft=Xt.pattern;u=null;let $r=Xt.short;if($r!==!1?gt===$r&&(c=Ft):Xt.isCustom===!0?(g=Ft.exec(p,w,et,_),g!==null?(c=g[0],g.payload!==void 0&&(u=g.payload)):c=null):(this.updateLastIndex(Ft,w),c=this.match(Ft,e,w)),c!==null){if(a=Xt.longerAlt,a!==void 0){let bt=a.length;for(o=0;o<bt;o++){let Mr=z[a[o]],gn=Mr.pattern;if(l=null,Mr.isCustom===!0?(g=gn.exec(p,w,et,_),g!==null?(s=g[0],g.payload!==void 0&&(l=g.payload)):s=null):(this.updateLastIndex(gn,w),s=this.match(gn,e,w)),s&&s.length>c.length){c=s,u=l,Xt=Mr;break}}}break}}if(c!==null){if(d=c.length,f=Xt.group,f!==void 0&&(m=Xt.tokenTypeIdx,v=this.createTokenInstance(c,w,m,Xt.tokenType,zt,I,d),this.handlePayload(v,u),f===!1?Q=this.addToken(et,Q,v):_[f].push(v)),e=this.chopInput(e,d),w=w+d,I=this.computeNewColumn(I,d),j===!0&&Xt.canLineTerminator===!0){let Ft=0,$r,bt;M.lastIndex=0;do $r=M.test(c),$r===!0&&(bt=M.lastIndex-1,Ft++);while($r===!0);Ft!==0&&(zt=zt+Ft,I=d-bt,this.updateTokenEndLineColumnLocation(v,f,bt,Ft,zt,I,d))}this.handleModes(Xt,lm,La,v)}else{let Ft=w,$r=zt,bt=I,Mr=nl===!1;for(;Mr===!1&&w<S;)for(e=this.chopInput(e,1),w++,i=0;i<oe;i++){let gn=z[i],Ln=gn.pattern,il=gn.short;if(il!==!1?p.charCodeAt(w)===il&&(Mr=!0):gn.isCustom===!0?Mr=Ln.exec(p,w,et,_)!==null:(this.updateLastIndex(Ln,w),Mr=Ln.exec(e)!==null),Mr===!0)break}if(T=w-Ft,I=this.computeNewColumn(I,T),R=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(p,Ft,T,$r,bt),dr.push({offset:Ft,line:$r,column:bt,length:T,message:R}),nl===!1)break}}return this.hasCustom||(et.length=Q),{tokens:et,groups:_,errors:dr}}handleModes(e,r,n,i){if(e.pop===!0){let o=e.push;r(i),o!==void 0&&n.call(this,o)}else e.push!==void 0&&n.call(this,e.push)}chopInput(e,r){return e.substring(r)}updateLastIndex(e,r){e.lastIndex=r}updateTokenEndLineColumnLocation(e,r,n,i,o,s,a){let c,u;r!==void 0&&(c=n===a-1,u=c?-1:0,i===1&&c===!0||(e.endLine=o+u,e.endColumn=s-1+-u))}computeNewColumn(e,r){return e+r}createOffsetOnlyToken(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}}createStartOnlyToken(e,r,n,i,o,s){return{image:e,startOffset:r,startLine:o,startColumn:s,tokenTypeIdx:n,tokenType:i}}createFullToken(e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:r+a-1,startLine:o,endLine:o,startColumn:s,endColumn:s+a-1,tokenTypeIdx:n,tokenType:i}}addTokenUsingPush(e,r,n){return e.push(n),r}addTokenUsingMemberAccess(e,r,n){return e[r]=n,r++,r}handlePayloadNoCustom(e,r){}handlePayloadWithCustom(e,r){r!==null&&(e.payload=r)}matchWithTest(e,r,n){return e.test(r)===!0?r.substring(n,e.lastIndex):null}matchWithExec(e,r){let n=e.exec(r);return n!==null?n[0]:null}};Fe.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";Fe.NA=/NOT_APPLICABLE/;function Cn(t){return xh(t)?t.LABEL:t.name}function xh(t){return mt(t.LABEL)&&t.LABEL!==""}var gL="parent",KS="categories",VS="label",zS="group",XS="push_mode",YS="pop_mode",JS="longer_alt",QS="line_breaks",ZS="start_chars_hint";function ri(t){return yL(t)}function yL(t){let e=t.pattern,r={};if(r.name=t.name,Ot(e)||(r.PATTERN=e),F(t,gL))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return F(t,KS)&&(r.CATEGORIES=t[KS]),En([r]),F(t,VS)&&(r.LABEL=t[VS]),F(t,zS)&&(r.GROUP=t[zS]),F(t,YS)&&(r.POP_MODE=t[YS]),F(t,XS)&&(r.PUSH_MODE=t[XS]),F(t,JS)&&(r.LONGER_ALT=t[JS]),F(t,QS)&&(r.LINE_BREAKS=t[QS]),F(t,ZS)&&(r.START_CHARS_HINT=t[ZS]),r}var yr=ri({name:"EOF",pattern:Fe.NA});En([yr]);function _n(t,e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:o,startColumn:s,endColumn:a,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}function vc(t,e){return bn(t,e)}var An={buildMismatchTokenMessage({expected:t,actual:e,previous:r,ruleName:n}){return`Expecting ${xh(t)?`--> ${Cn(t)} <--`:`token of type --> ${t.name} <--`} but found --> '${e.image}' <--`},buildNotAllInputParsedMessage({firstRedundant:t,ruleName:e}){return"Redundant input, expecting EOF but found: "+t.image},buildNoViableAltMessage({expectedPathsPerAlt:t,actual:e,previous:r,customUserDescription:n,ruleName:i}){let o="Expecting: ",a=`
but found: '`+xt(e).image+"'";if(n)return o+n+a;{let c=Ke(t,(f,m)=>f.concat(m),[]),u=P(c,f=>`[${P(f,m=>Cn(m)).join(", ")}]`),d=`one of these possible Token sequences:
${P(u,(f,m)=>`  ${m+1}. ${f}`).join(`
`)}`;return o+d+a}},buildEarlyExitMessage({expectedIterationPaths:t,actual:e,customUserDescription:r,ruleName:n}){let i="Expecting: ",s=`
but found: '`+xt(e).image+"'";if(r)return i+r+s;{let c=`expecting at least one iteration which starts with one of these possible Token sequences::
  <${P(t,u=>`[${P(u,l=>Cn(l)).join(",")}]`).join(" ,")}>`;return i+c+s}}};Object.freeze(An);var eb={buildRuleNotFoundError(t,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-"}},jr={buildDuplicateFoundError(t,e){function r(l){return l instanceof te?l.terminalType.name:l instanceof pe?l.nonTerminalName:""}let n=t.name,i=xt(e),o=i.idx,s=ir(i),a=r(i),c=o>0,u=`->${s}${c?o:""}<- ${a?`with argument: ->${a}<-`:""}
                  appears more than once (${e.length} times) in the top level rule: ->${n}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;return u=u.replace(/[ \t]+/g," "),u=u.replace(/\s\s+/g,`
`),u},buildNamespaceConflictError(t){return`Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${t.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`},buildAlternationPrefixAmbiguityError(t){let e=P(t.prefixPath,i=>Cn(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx;return`Ambiguous alternatives: <${t.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`},buildAlternationAmbiguityError(t){let e=P(t.prefixPath,i=>Cn(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(" ,")}> in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError(t){let e=ir(t.repetition);return t.repetition.idx!==0&&(e+=t.repetition.idx),`The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`},buildTokenNameError(t){return"deprecated"},buildEmptyAlternationError(t){return`Ambiguous empty alternative: <${t.emptyChoiceIdx+1}> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`},buildTooManyAlternativesError(t){return`An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length+1} alternatives.`},buildLeftRecursionError(t){let e=t.topLevelRule.name,r=P(t.leftRecursionPath,o=>o.name),n=`${e} --> ${r.concat([e]).join(" --> ")}`;return`Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${n}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`},buildInvalidRuleNameError(t){return"deprecated"},buildDuplicateRuleNameError(t){let e;return t.topLevelRule instanceof Wt?e=t.topLevelRule.name:e=t.topLevelRule,`Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`}};function tb(t,e){let r=new Th(t,e);return r.resolveRefs(),r.errors}var Th=class extends Gt{constructor(e,r){super(),this.nameToTopRule=e,this.errMsgProvider=r,this.errors=[]}resolveRefs(){D(ge(this.nameToTopRule),e=>{this.currTopLevel=e,e.accept(this)})}visitNonTerminal(e){let r=this.nameToTopRule[e.nonTerminalName];if(r)e.referencedRule=r;else{let n=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,e);this.errors.push({message:n,type:ht.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:e.nonTerminalName})}}};var Rh=class extends Sn{constructor(e,r){super(),this.topProd=e,this.path=r,this.possibleTokTypes=[],this.nextProductionName="",this.nextProductionOccurrence=0,this.found=!1,this.isAtEndOfPath=!1}startWalking(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=be(this.path.ruleStack).reverse(),this.occurrenceStack=be(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes}walk(e,r=[]){this.found||super.walk(e,r)}walkProdRef(e,r,n){if(e.referencedRule.name===this.nextProductionName&&e.idx===this.nextProductionOccurrence){let i=r.concat(n);this.updateExpectedNext(),this.walk(e.referencedRule,i)}}updateExpectedNext(){Z(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())}},nd=class extends Rh{constructor(e,r){super(e,r),this.path=r,this.nextTerminalName="",this.nextTerminalOccurrence=0,this.nextTerminalName=this.path.lastTok.name,this.nextTerminalOccurrence=this.path.lastTokOccurrence}walkTerminal(e,r,n){if(this.isAtEndOfPath&&e.terminalType.name===this.nextTerminalName&&e.idx===this.nextTerminalOccurrence&&!this.found){let i=r.concat(n),o=new Ee({definition:i});this.possibleTokTypes=Ui(o),this.found=!0}}},js=class extends Sn{constructor(e,r){super(),this.topRule=e,this.occurrence=r,this.result={token:void 0,occurrence:void 0,isEndOfRule:void 0}}startWalking(){return this.walk(this.topRule),this.result}},id=class extends js{walkMany(e,r,n){if(e.idx===this.occurrence){let i=xt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof te&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkMany(e,r,n)}},xc=class extends js{walkManySep(e,r,n){if(e.idx===this.occurrence){let i=xt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof te&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkManySep(e,r,n)}},od=class extends js{walkAtLeastOne(e,r,n){if(e.idx===this.occurrence){let i=xt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof te&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOne(e,r,n)}},Tc=class extends js{walkAtLeastOneSep(e,r,n){if(e.idx===this.occurrence){let i=xt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof te&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOneSep(e,r,n)}};function sd(t,e,r=[]){r=be(r);let n=[],i=0;function o(a){return a.concat(it(t,i+1))}function s(a){let c=sd(o(a),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){let a=t[i];if(a instanceof Ee)return s(a.definition);if(a instanceof pe)return s(a.definition);if(a instanceof me)n=s(a.definition);else if(a instanceof Ce){let c=a.definition.concat([new se({definition:a.definition})]);return s(c)}else if(a instanceof _e){let c=[new Ee({definition:a.definition}),new se({definition:[new te({terminalType:a.separator})].concat(a.definition)})];return s(c)}else if(a instanceof ve){let c=a.definition.concat([new se({definition:[new te({terminalType:a.separator})].concat(a.definition)})]);n=s(c)}else if(a instanceof se){let c=a.definition.concat([new se({definition:a.definition})]);n=s(c)}else{if(a instanceof xe)return D(a.definition,c=>{Z(c.definition)===!1&&(n=s(c.definition))}),n;if(a instanceof te)r.push(a.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:it(t,i)}),n}function ad(t,e,r,n){let i="EXIT_NONE_TERMINAL",o=[i],s="EXIT_ALTERNATIVE",a=!1,c=e.length,u=c-n-1,l=[],d=[];for(d.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!Z(d);){let f=d.pop();if(f===s){a&&sn(d).idx<=u&&d.pop();continue}let m=f.def,v=f.idx,T=f.ruleStack,C=f.occurrenceStack;if(Z(m))continue;let R=m[0];if(R===i){let g={idx:v,def:it(m),ruleStack:Rn(T),occurrenceStack:Rn(C)};d.push(g)}else if(R instanceof te)if(v<c-1){let g=v+1,p=e[g];if(r(p,R.terminalType)){let S={idx:g,def:it(m),ruleStack:T,occurrenceStack:C};d.push(S)}}else if(v===c-1)l.push({nextTokenType:R.terminalType,nextTokenOccurrence:R.idx,ruleStack:T,occurrenceStack:C}),a=!0;else throw Error("non exhaustive match");else if(R instanceof pe){let g=be(T);g.push(R.nonTerminalName);let p=be(C);p.push(R.idx);let S={idx:v,def:R.definition.concat(o,it(m)),ruleStack:g,occurrenceStack:p};d.push(S)}else if(R instanceof me){let g={idx:v,def:it(m),ruleStack:T,occurrenceStack:C};d.push(g),d.push(s);let p={idx:v,def:R.definition.concat(it(m)),ruleStack:T,occurrenceStack:C};d.push(p)}else if(R instanceof Ce){let g=new se({definition:R.definition,idx:R.idx}),p=R.definition.concat([g],it(m)),S={idx:v,def:p,ruleStack:T,occurrenceStack:C};d.push(S)}else if(R instanceof _e){let g=new te({terminalType:R.separator}),p=new se({definition:[g].concat(R.definition),idx:R.idx}),S=R.definition.concat([p],it(m)),w={idx:v,def:S,ruleStack:T,occurrenceStack:C};d.push(w)}else if(R instanceof ve){let g={idx:v,def:it(m),ruleStack:T,occurrenceStack:C};d.push(g),d.push(s);let p=new te({terminalType:R.separator}),S=new se({definition:[p].concat(R.definition),idx:R.idx}),w=R.definition.concat([S],it(m)),Q={idx:v,def:w,ruleStack:T,occurrenceStack:C};d.push(Q)}else if(R instanceof se){let g={idx:v,def:it(m),ruleStack:T,occurrenceStack:C};d.push(g),d.push(s);let p=new se({definition:R.definition,idx:R.idx}),S=R.definition.concat([p],it(m)),w={idx:v,def:S,ruleStack:T,occurrenceStack:C};d.push(w)}else if(R instanceof xe)for(let g=R.definition.length-1;g>=0;g--){let p=R.definition[g],S={idx:v,def:p.definition.concat(it(m)),ruleStack:T,occurrenceStack:C};d.push(S),d.push(s)}else if(R instanceof Ee)d.push({idx:v,def:R.definition.concat(it(m)),ruleStack:T,occurrenceStack:C});else if(R instanceof Wt)d.push(vL(R,v,T,C));else throw Error("non exhaustive match")}return l}function vL(t,e,r,n){let i=be(r);i.push(t.name);let o=be(n);return o.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:o}}var qe;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(qe||(qe={}));function Rc(t){if(t instanceof me||t==="Option")return qe.OPTION;if(t instanceof se||t==="Repetition")return qe.REPETITION;if(t instanceof Ce||t==="RepetitionMandatory")return qe.REPETITION_MANDATORY;if(t instanceof _e||t==="RepetitionMandatoryWithSeparator")return qe.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof ve||t==="RepetitionWithSeparator")return qe.REPETITION_WITH_SEPARATOR;if(t instanceof xe||t==="Alternation")return qe.ALTERNATION;throw Error("non exhaustive match")}function ud(t){let{occurrence:e,rule:r,prodType:n,maxLookahead:i}=t,o=Rc(n);return o===qe.ALTERNATION?Us(e,r,i):Bs(e,r,o,i)}function nb(t,e,r,n,i,o){let s=Us(t,e,r),a=ub(s)?Fs:bn;return o(s,n,a,i)}function ib(t,e,r,n,i,o){let s=Bs(t,e,i,r),a=ub(s)?Fs:bn;return o(s[0],a,n)}function ob(t,e,r,n){let i=t.length,o=Nt(t,s=>Nt(s,a=>a.length===1));if(e)return function(s){let a=P(s,c=>c.GATE);for(let c=0;c<i;c++){let u=t[c],l=u.length,d=a[c];if(!(d!==void 0&&d.call(this)===!1))e:for(let f=0;f<l;f++){let m=u[f],v=m.length;for(let T=0;T<v;T++){let C=this.LA(T+1);if(r(C,m[T])===!1)continue e}return c}}};if(o&&!n){let s=P(t,c=>nt(c)),a=Ke(s,(c,u,l)=>(D(u,d=>{F(c,d.tokenTypeIdx)||(c[d.tokenTypeIdx]=l),D(d.categoryMatches,f=>{F(c,f)||(c[f]=l)})}),c),{});return function(){let c=this.LA(1);return a[c.tokenTypeIdx]}}else return function(){for(let s=0;s<i;s++){let a=t[s],c=a.length;e:for(let u=0;u<c;u++){let l=a[u],d=l.length;for(let f=0;f<d;f++){let m=this.LA(f+1);if(r(m,l[f])===!1)continue e}return s}}}}function sb(t,e,r){let n=Nt(t,o=>o.length===1),i=t.length;if(n&&!r){let o=nt(t);if(o.length===1&&Z(o[0].categoryMatches)){let a=o[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===a}}else{let s=Ke(o,(a,c,u)=>(a[c.tokenTypeIdx]=!0,D(c.categoryMatches,l=>{a[l]=!0}),a),[]);return function(){let a=this.LA(1);return s[a.tokenTypeIdx]===!0}}}else return function(){e:for(let o=0;o<i;o++){let s=t[o],a=s.length;for(let c=0;c<a;c++){let u=this.LA(c+1);if(e(u,s[c])===!1)continue e}return!0}return!1}}var bh=class extends Sn{constructor(e,r,n){super(),this.topProd=e,this.targetOccurrence=r,this.targetProdType=n}startWalking(){return this.walk(this.topProd),this.restDef}checkIsTarget(e,r,n,i){return e.idx===this.targetOccurrence&&this.targetProdType===r?(this.restDef=n.concat(i),!0):!1}walkOption(e,r,n){this.checkIsTarget(e,qe.OPTION,r,n)||super.walkOption(e,r,n)}walkAtLeastOne(e,r,n){this.checkIsTarget(e,qe.REPETITION_MANDATORY,r,n)||super.walkOption(e,r,n)}walkAtLeastOneSep(e,r,n){this.checkIsTarget(e,qe.REPETITION_MANDATORY_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}walkMany(e,r,n){this.checkIsTarget(e,qe.REPETITION,r,n)||super.walkOption(e,r,n)}walkManySep(e,r,n){this.checkIsTarget(e,qe.REPETITION_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}},cd=class extends Gt{constructor(e,r,n){super(),this.targetOccurrence=e,this.targetProdType=r,this.targetRef=n,this.result=[]}checkIsTarget(e,r){e.idx===this.targetOccurrence&&this.targetProdType===r&&(this.targetRef===void 0||e===this.targetRef)&&(this.result=e.definition)}visitOption(e){this.checkIsTarget(e,qe.OPTION)}visitRepetition(e){this.checkIsTarget(e,qe.REPETITION)}visitRepetitionMandatory(e){this.checkIsTarget(e,qe.REPETITION_MANDATORY)}visitRepetitionMandatoryWithSeparator(e){this.checkIsTarget(e,qe.REPETITION_MANDATORY_WITH_SEPARATOR)}visitRepetitionWithSeparator(e){this.checkIsTarget(e,qe.REPETITION_WITH_SEPARATOR)}visitAlternation(e){this.checkIsTarget(e,qe.ALTERNATION)}};function rb(t){let e=new Array(t);for(let r=0;r<t;r++)e[r]=[];return e}function Sh(t){let e=[""];for(let r=0;r<t.length;r++){let n=t[r],i=[];for(let o=0;o<e.length;o++){let s=e[o];i.push(s+"_"+n.tokenTypeIdx);for(let a=0;a<n.categoryMatches.length;a++){let c="_"+n.categoryMatches[a];i.push(s+c)}}e=i}return e}function xL(t,e,r){for(let n=0;n<t.length;n++){if(n===r)continue;let i=t[n];for(let o=0;o<e.length;o++){let s=e[o];if(i[s]===!0)return!1}}return!0}function ab(t,e){let r=P(t,s=>sd([s],1)),n=rb(r.length),i=P(r,s=>{let a={};return D(s,c=>{let u=Sh(c.partialPath);D(u,l=>{a[l]=!0})}),a}),o=r;for(let s=1;s<=e;s++){let a=o;o=rb(a.length);for(let c=0;c<a.length;c++){let u=a[c];for(let l=0;l<u.length;l++){let d=u[l].partialPath,f=u[l].suffixDef,m=Sh(d);if(xL(i,m,c)||Z(f)||d.length===e){let T=n[c];if(ld(T,d)===!1){T.push(d);for(let C=0;C<m.length;C++){let R=m[C];i[c][R]=!0}}}else{let T=sd(f,s+1,d);o[c]=o[c].concat(T),D(T,C=>{let R=Sh(C.partialPath);D(R,g=>{i[c][g]=!0})})}}}}return n}function Us(t,e,r,n){let i=new cd(t,qe.ALTERNATION,n);return e.accept(i),ab(i.result,r)}function Bs(t,e,r,n){let i=new cd(t,r);e.accept(i);let o=i.result,a=new bh(e,t,r).startWalking(),c=new Ee({definition:o}),u=new Ee({definition:a});return ab([c,u],n)}function ld(t,e){e:for(let r=0;r<t.length;r++){let n=t[r];if(n.length===e.length){for(let i=0;i<n.length;i++){let o=e[i],s=n[i];if((o===s||s.categoryMatchesMap[o.tokenTypeIdx]!==void 0)===!1)continue e}return!0}}return!1}function cb(t,e){return t.length<e.length&&Nt(t,(r,n)=>{let i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}function ub(t){return Nt(t,e=>Nt(e,r=>Nt(r,n=>Z(n.categoryMatches))))}function lb(t){let e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return P(e,r=>Object.assign({type:ht.CUSTOM_LOOKAHEAD_VALIDATION},r))}function db(t,e,r,n){let i=_t(t,c=>TL(c,r)),o=_L(t,e,r),s=_t(t,c=>bL(c,r)),a=_t(t,c=>SL(c,t,n,r));return i.concat(o,s,a)}function TL(t,e){let r=new Eh;t.accept(r);let n=r.allProductions,i=uh(n,RL),o=nr(i,a=>a.length>1);return P(ge(o),a=>{let c=xt(a),u=e.buildDuplicateFoundError(t,a),l=ir(c),d={message:u,type:ht.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:l,occurrence:c.idx},f=fb(c);return f&&(d.parameter=f),d})}function RL(t){return`${ir(t)}_#_${t.idx}_#_${fb(t)}`}function fb(t){return t instanceof te?t.terminalType.name:t instanceof pe?t.nonTerminalName:""}var Eh=class extends Gt{constructor(){super(...arguments),this.allProductions=[]}visitNonTerminal(e){this.allProductions.push(e)}visitOption(e){this.allProductions.push(e)}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}visitAlternation(e){this.allProductions.push(e)}visitTerminal(e){this.allProductions.push(e)}};function SL(t,e,r,n){let i=[];if(Ke(e,(s,a)=>a.name===t.name?s+1:s,0)>1){let s=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:s,type:ht.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}function pb(t,e,r){let n=[],i;return Me(e,t)||(i=`Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${r}<-as it is not defined in any of the super grammars `,n.push({message:i,type:ht.INVALID_RULE_OVERRIDE,ruleName:t})),n}function _h(t,e,r,n=[]){let i=[],o=dd(e.definition);if(Z(o))return[];{let s=t.name;Me(o,t)&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:ht.LEFT_RECURSION,ruleName:s});let c=ei(o,n.concat([t])),u=_t(c,l=>{let d=be(n);return d.push(l),_h(t,l,r,d)});return i.concat(u)}}function dd(t){let e=[];if(Z(t))return e;let r=xt(t);if(r instanceof pe)e.push(r.referencedRule);else if(r instanceof Ee||r instanceof me||r instanceof Ce||r instanceof _e||r instanceof ve||r instanceof se)e=e.concat(dd(r.definition));else if(r instanceof xe)e=nt(P(r.definition,o=>dd(o.definition)));else if(!(r instanceof te))throw Error("non exhaustive match");let n=ji(r),i=t.length>1;if(n&&i){let o=it(t);return e.concat(dd(o))}else return e}var Sc=class extends Gt{constructor(){super(...arguments),this.alternations=[]}visitAlternation(e){this.alternations.push(e)}};function mb(t,e){let r=new Sc;t.accept(r);let n=r.alternations;return _t(n,o=>{let s=Rn(o.definition);return _t(s,(a,c)=>{let u=ad([a],[],bn,1);return Z(u)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:o,emptyChoiceIdx:c}),type:ht.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:o.idx,alternative:c+1}]:[]})})}function hb(t,e,r){let n=new Sc;t.accept(n);let i=n.alternations;return i=ti(i,s=>s.ignoreAmbiguities===!0),_t(i,s=>{let a=s.idx,c=s.maxLookahead||e,u=Us(a,t,c,s),l=EL(u,s,t,r),d=CL(u,s,t,r);return l.concat(d)})}var Ch=class extends Gt{constructor(){super(...arguments),this.allProductions=[]}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}};function bL(t,e){let r=new Sc;t.accept(r);let n=r.alternations;return _t(n,o=>o.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:o}),type:ht.TOO_MANY_ALTS,ruleName:t.name,occurrence:o.idx}]:[])}function gb(t,e,r){let n=[];return D(t,i=>{let o=new Ch;i.accept(o);let s=o.allProductions;D(s,a=>{let c=Rc(a),u=a.maxLookahead||e,l=a.idx,f=Bs(l,i,c,u)[0];if(Z(nt(f))){let m=r.buildEmptyRepetitionError({topLevelRule:i,repetition:a});n.push({message:m,type:ht.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}function EL(t,e,r,n){let i=[],o=Ke(t,(a,c,u)=>(e.definition[u].ignoreAmbiguities===!0||D(c,l=>{let d=[u];D(t,(f,m)=>{u!==m&&ld(f,l)&&e.definition[m].ignoreAmbiguities!==!0&&d.push(m)}),d.length>1&&!ld(i,l)&&(i.push(l),a.push({alts:d,path:l}))}),a),[]);return P(o,a=>{let c=P(a.alts,l=>l+1);return{message:n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:c,prefixPath:a.path}),type:ht.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:a.alts}})}function CL(t,e,r,n){let i=Ke(t,(s,a,c)=>{let u=P(a,l=>({idx:c,path:l}));return s.concat(u)},[]);return on(_t(i,s=>{if(e.definition[s.idx].ignoreAmbiguities===!0)return[];let c=s.idx,u=s.path,l=vt(i,f=>e.definition[f.idx].ignoreAmbiguities!==!0&&f.idx<c&&cb(f.path,u));return P(l,f=>{let m=[f.idx+1,c+1],v=e.idx===0?"":e.idx;return{message:n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:m,prefixPath:f.path}),type:ht.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:v,alternatives:m}})}))}function _L(t,e,r){let n=[],i=P(e,o=>o.name);return D(t,o=>{let s=o.name;if(Me(i,s)){let a=r.buildNamespaceConflictError(o);n.push({message:a,type:ht.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:s})}}),n}function yb(t){let e=Ns(t,{errMsgProvider:eb}),r={};return D(t.rules,n=>{r[n.name]=n}),tb(r,e.errMsgProvider)}function vb(t){return t=Ns(t,{errMsgProvider:jr}),db(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}var xb="MismatchedTokenException",Tb="NoViableAltException",Rb="EarlyExitException",Sb="NotAllInputParsedException",bb=[xb,Tb,Rb,Sb];Object.freeze(bb);function ni(t){return Me(bb,t.name)}var Ws=class extends Error{constructor(e,r){super(e),this.token=r,this.resyncedTokens=[],Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},Wi=class extends Ws{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=xb}},bc=class extends Ws{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=Tb}},Ec=class extends Ws{constructor(e,r){super(e,r),this.name=Sb}},Cc=class extends Ws{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=Rb}};var Ah={},wh="InRuleRecoveryException",kh=class extends Error{constructor(e){super(e),this.name=wh}},fd=class{initRecoverable(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=F(e,"recoveryEnabled")?e.recoveryEnabled:Ht.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=AL)}getTokenToInsert(e){let r=_n(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r}canTokenTypeBeInsertedInRecovery(e){return!0}canTokenTypeBeDeletedInRecovery(e){return!0}tryInRepetitionRecovery(e,r,n,i){let o=this.findReSyncTokenType(),s=this.exportLexerState(),a=[],c=!1,u=this.LA(1),l=this.LA(1),d=()=>{let f=this.LA(0),m=this.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:u,previous:f,ruleName:this.getCurrRuleFullName()}),v=new Wi(m,u,this.LA(0));v.resyncedTokens=Rn(a),this.SAVE_ERROR(v)};for(;!c;)if(this.tokenMatcher(l,i)){d();return}else if(n.call(this)){d(),e.apply(this,r);return}else this.tokenMatcher(l,o)?c=!0:(l=this.SKIP_TOKEN(),this.addToResyncTokens(l,a));this.importLexerState(s)}shouldInRepetitionRecoveryBeTried(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))}getFollowsForInRuleRecovery(e,r){let n=this.getCurrentGrammarPath(e,r);return this.getNextPossibleTokenTypes(n)}tryInRuleRecovery(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r))return this.getTokenToInsert(e);if(this.canRecoverWithSingleTokenDeletion(e)){let n=this.SKIP_TOKEN();return this.consumeToken(),n}throw new kh("sad sad panda")}canPerformInRuleRecovery(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)}canRecoverWithSingleTokenInsertion(e,r){if(!this.canTokenTypeBeInsertedInRecovery(e)||Z(r))return!1;let n=this.LA(1);return an(r,o=>this.tokenMatcher(n,o))!==void 0}canRecoverWithSingleTokenDeletion(e){return this.canTokenTypeBeDeletedInRecovery(e)?this.tokenMatcher(this.LA(2),e):!1}isInCurrentRuleReSyncSet(e){let r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return Me(n,e)}findReSyncTokenType(){let e=this.flattenFollowSet(),r=this.LA(1),n=2;for(;;){let i=an(e,o=>vc(r,o));if(i!==void 0)return i;r=this.LA(n),n++}}getCurrFollowKey(){if(this.RULE_STACK.length===1)return Ah;let e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}}buildFullFollowKeyStack(){let e=this.RULE_STACK,r=this.RULE_OCCURRENCE_STACK;return P(e,(n,i)=>i===0?Ah:{ruleName:this.shortRuleNameToFullName(n),idxInCallingRule:r[i],inRule:this.shortRuleNameToFullName(e[i-1])})}flattenFollowSet(){let e=P(this.buildFullFollowKeyStack(),r=>this.getFollowSetFromFollowKey(r));return nt(e)}getFollowSetFromFollowKey(e){if(e===Ah)return[yr];let r=e.ruleName+e.idxInCallingRule+Jl+e.inRule;return this.resyncFollows[r]}addToResyncTokens(e,r){return this.tokenMatcher(e,yr)||r.push(e),r}reSyncTo(e){let r=[],n=this.LA(1);for(;this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return Rn(r)}attemptInRepetitionRecovery(e,r,n,i,o,s,a){}getCurrentGrammarPath(e,r){let n=this.getHumanReadableRuleStack(),i=be(this.RULE_OCCURRENCE_STACK);return{ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r}}getHumanReadableRuleStack(){return P(this.RULE_STACK,e=>this.shortRuleNameToFullName(e))}};function AL(t,e,r,n,i,o,s){let a=this.getKeyForAutomaticLookahead(n,i),c=this.firstAfterRepMap[a];if(c===void 0){let f=this.getCurrRuleFullName(),m=this.getGAstProductions()[f];c=new o(m,i).startWalking(),this.firstAfterRepMap[a]=c}let u=c.token,l=c.occurrence,d=c.isEndOfRule;this.RULE_STACK.length===1&&d&&u===void 0&&(u=yr,l=1),!(u===void 0||l===void 0)&&this.shouldInRepetitionRecoveryBeTried(u,l,s)&&this.tryInRepetitionRecovery(t,e,r,u)}function pd(t,e,r){return r|e|t}var kn=class{constructor(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:Ht.maxLookahead}validate(e){let r=this.validateNoLeftRecursion(e.rules);if(Z(r)){let n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),o=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead);return[...r,...n,...i,...o]}return r}validateNoLeftRecursion(e){return _t(e,r=>_h(r,r,jr))}validateEmptyOrAlternatives(e){return _t(e,r=>mb(r,jr))}validateAmbiguousAlternationAlternatives(e,r){return _t(e,n=>hb(n,r,jr))}validateSomeNonEmptyLookaheadPath(e,r){return gb(e,r,jr)}buildLookaheadForAlternation(e){return nb(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,ob)}buildLookaheadForOptional(e){return ib(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,Rc(e.prodType),sb)}};var hd=class{initLooksAhead(e){this.dynamicTokensEnabled=F(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:Ht.dynamicTokensEnabled,this.maxLookahead=F(e,"maxLookahead")?e.maxLookahead:Ht.maxLookahead,this.lookaheadStrategy=F(e,"lookaheadStrategy")?e.lookaheadStrategy:new kn({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map}preComputeLookaheadFunctions(e){D(e,r=>{this.TRACE_INIT(`${r.name} Rule Lookahead`,()=>{let{alternation:n,repetition:i,option:o,repetitionMandatory:s,repetitionMandatoryWithSeparator:a,repetitionWithSeparator:c}=kL(r);D(n,u=>{let l=u.idx===0?"":u.idx;this.TRACE_INIT(`${ir(u)}${l}`,()=>{let d=this.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:u.idx,rule:r,maxLookahead:u.maxLookahead||this.maxLookahead,hasPredicates:u.hasPredicates,dynamicTokensEnabled:this.dynamicTokensEnabled}),f=pd(this.fullRuleNameToShort[r.name],256,u.idx);this.setLaFuncCache(f,d)})}),D(i,u=>{this.computeLookaheadFunc(r,u.idx,768,"Repetition",u.maxLookahead,ir(u))}),D(o,u=>{this.computeLookaheadFunc(r,u.idx,512,"Option",u.maxLookahead,ir(u))}),D(s,u=>{this.computeLookaheadFunc(r,u.idx,1024,"RepetitionMandatory",u.maxLookahead,ir(u))}),D(a,u=>{this.computeLookaheadFunc(r,u.idx,1536,"RepetitionMandatoryWithSeparator",u.maxLookahead,ir(u))}),D(c,u=>{this.computeLookaheadFunc(r,u.idx,1280,"RepetitionWithSeparator",u.maxLookahead,ir(u))})})})}computeLookaheadFunc(e,r,n,i,o,s){this.TRACE_INIT(`${s}${r===0?"":r}`,()=>{let a=this.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:o||this.maxLookahead,dynamicTokensEnabled:this.dynamicTokensEnabled,prodType:i}),c=pd(this.fullRuleNameToShort[e.name],n,r);this.setLaFuncCache(c,a)})}getKeyForAutomaticLookahead(e,r){let n=this.getLastExplicitRuleShortName();return pd(n,e,r)}getLaFuncFromCache(e){return this.lookAheadFuncsCache.get(e)}setLaFuncCache(e,r){this.lookAheadFuncsCache.set(e,r)}},Ph=class extends Gt{constructor(){super(...arguments),this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}reset(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}visitOption(e){this.dslMethods.option.push(e)}visitRepetitionWithSeparator(e){this.dslMethods.repetitionWithSeparator.push(e)}visitRepetitionMandatory(e){this.dslMethods.repetitionMandatory.push(e)}visitRepetitionMandatoryWithSeparator(e){this.dslMethods.repetitionMandatoryWithSeparator.push(e)}visitRepetition(e){this.dslMethods.repetition.push(e)}visitAlternation(e){this.dslMethods.alternation.push(e)}},md=new Ph;function kL(t){md.reset(),t.accept(md);let e=md.dslMethods;return md.reset(),e}function Ih(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}function Dh(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}function Eb(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}function Cb(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}var wL="name";function $h(t,e){Object.defineProperty(t,wL,{enumerable:!1,configurable:!0,writable:!1,value:e})}function PL(t,e){let r=Re(t),n=r.length;for(let i=0;i<n;i++){let o=r[i],s=t[o],a=s.length;for(let c=0;c<a;c++){let u=s[c];u.tokenTypeIdx===void 0&&this[u.name](u.children,e)}}}function _b(t,e){let r=function(){};$h(r,t+"BaseSemantics");let n={visit:function(i,o){if(q(i)&&(i=i[0]),!Ot(i))return this[i.name](i.children,o)},validateVisitor:function(){let i=NL(this,e);if(!Z(i)){let o=P(i,s=>s.msg);throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g,`
	`)}`)}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}function Ab(t,e,r){let n=function(){};$h(n,t+"BaseSemanticsWithDefaults");let i=Object.create(r.prototype);return D(e,o=>{i[o]=PL}),n.prototype=i,n.prototype.constructor=n,n}var Mh;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(Mh||(Mh={}));function NL(t,e){return OL(t,e)}function OL(t,e){let r=vt(e,i=>Bt(t[i])===!1),n=P(r,i=>({msg:`Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,type:Mh.MISSING_METHOD,methodName:i}));return on(n)}var xd=class{initTreeBuilder(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=F(e,"nodeLocationTracking")?e.nodeLocationTracking:Ht.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=He,this.cstFinallyStateUpdate=He,this.cstPostTerminal=He,this.cstPostNonTerminal=He,this.cstPostRule=He;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Dh,this.setNodeLocationFromNode=Dh,this.cstPostRule=He,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=He,this.setNodeLocationFromNode=He,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Ih,this.setNodeLocationFromNode=Ih,this.cstPostRule=He,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=He,this.setNodeLocationFromNode=He,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=He,this.setNodeLocationFromNode=He,this.cstPostRule=He,this.setInitialNodeLocation=He;else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`)}setInitialNodeLocationOnlyOffsetRecovery(e){e.location={startOffset:NaN,endOffset:NaN}}setInitialNodeLocationOnlyOffsetRegular(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}}setInitialNodeLocationFullRecovery(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}}setInitialNodeLocationFullRegular(e){let r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}}cstInvocationStateUpdate(e){let r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)}cstFinallyStateUpdate(){this.CST_STACK.pop()}cstPostRuleFull(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)}cstPostRuleOnlyOffset(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN}cstPostTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];Eb(n,r,e),this.setNodeLocationFromToken(n.location,r)}cstPostNonTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];Cb(n,r,e),this.setNodeLocationFromNode(n.location,e.location)}getBaseCstVisitorConstructor(){if(Ot(this.baseCstVisitorConstructor)){let e=_b(this.className,Re(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor}getBaseCstVisitorConstructorWithDefaults(){if(Ot(this.baseCstVisitorWithDefaultsConstructor)){let e=Ab(this.className,Re(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor}getLastExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-1]}getPreviousExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-2]}getLastExplicitRuleOccurrenceIndex(){let e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]}};var Td=class{initLexerAdapter(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1}set input(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length}get input(){return this.tokVector}SKIP_TOKEN(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):Gs}LA(e){let r=this.currIdx+e;return r<0||this.tokVectorLength<=r?Gs:this.tokVector[r]}consumeToken(){this.currIdx++}exportLexerState(){return this.currIdx}importLexerState(e){this.currIdx=e}resetLexerState(){this.currIdx=-1}moveToTerminatedState(){this.currIdx=this.tokVector.length-1}getLexerPosition(){return this.exportLexerState()}};var Rd=class{ACTION(e){return e.call(this)}consume(e,r,n){return this.consumeInternal(r,e,n)}subrule(e,r,n){return this.subruleInternal(r,e,n)}option(e,r){return this.optionInternal(r,e)}or(e,r){return this.orInternal(r,e)}many(e,r){return this.manyInternal(e,r)}atLeastOne(e,r){return this.atLeastOneInternal(e,r)}CONSUME(e,r){return this.consumeInternal(e,0,r)}CONSUME1(e,r){return this.consumeInternal(e,1,r)}CONSUME2(e,r){return this.consumeInternal(e,2,r)}CONSUME3(e,r){return this.consumeInternal(e,3,r)}CONSUME4(e,r){return this.consumeInternal(e,4,r)}CONSUME5(e,r){return this.consumeInternal(e,5,r)}CONSUME6(e,r){return this.consumeInternal(e,6,r)}CONSUME7(e,r){return this.consumeInternal(e,7,r)}CONSUME8(e,r){return this.consumeInternal(e,8,r)}CONSUME9(e,r){return this.consumeInternal(e,9,r)}SUBRULE(e,r){return this.subruleInternal(e,0,r)}SUBRULE1(e,r){return this.subruleInternal(e,1,r)}SUBRULE2(e,r){return this.subruleInternal(e,2,r)}SUBRULE3(e,r){return this.subruleInternal(e,3,r)}SUBRULE4(e,r){return this.subruleInternal(e,4,r)}SUBRULE5(e,r){return this.subruleInternal(e,5,r)}SUBRULE6(e,r){return this.subruleInternal(e,6,r)}SUBRULE7(e,r){return this.subruleInternal(e,7,r)}SUBRULE8(e,r){return this.subruleInternal(e,8,r)}SUBRULE9(e,r){return this.subruleInternal(e,9,r)}OPTION(e){return this.optionInternal(e,0)}OPTION1(e){return this.optionInternal(e,1)}OPTION2(e){return this.optionInternal(e,2)}OPTION3(e){return this.optionInternal(e,3)}OPTION4(e){return this.optionInternal(e,4)}OPTION5(e){return this.optionInternal(e,5)}OPTION6(e){return this.optionInternal(e,6)}OPTION7(e){return this.optionInternal(e,7)}OPTION8(e){return this.optionInternal(e,8)}OPTION9(e){return this.optionInternal(e,9)}OR(e){return this.orInternal(e,0)}OR1(e){return this.orInternal(e,1)}OR2(e){return this.orInternal(e,2)}OR3(e){return this.orInternal(e,3)}OR4(e){return this.orInternal(e,4)}OR5(e){return this.orInternal(e,5)}OR6(e){return this.orInternal(e,6)}OR7(e){return this.orInternal(e,7)}OR8(e){return this.orInternal(e,8)}OR9(e){return this.orInternal(e,9)}MANY(e){this.manyInternal(0,e)}MANY1(e){this.manyInternal(1,e)}MANY2(e){this.manyInternal(2,e)}MANY3(e){this.manyInternal(3,e)}MANY4(e){this.manyInternal(4,e)}MANY5(e){this.manyInternal(5,e)}MANY6(e){this.manyInternal(6,e)}MANY7(e){this.manyInternal(7,e)}MANY8(e){this.manyInternal(8,e)}MANY9(e){this.manyInternal(9,e)}MANY_SEP(e){this.manySepFirstInternal(0,e)}MANY_SEP1(e){this.manySepFirstInternal(1,e)}MANY_SEP2(e){this.manySepFirstInternal(2,e)}MANY_SEP3(e){this.manySepFirstInternal(3,e)}MANY_SEP4(e){this.manySepFirstInternal(4,e)}MANY_SEP5(e){this.manySepFirstInternal(5,e)}MANY_SEP6(e){this.manySepFirstInternal(6,e)}MANY_SEP7(e){this.manySepFirstInternal(7,e)}MANY_SEP8(e){this.manySepFirstInternal(8,e)}MANY_SEP9(e){this.manySepFirstInternal(9,e)}AT_LEAST_ONE(e){this.atLeastOneInternal(0,e)}AT_LEAST_ONE1(e){return this.atLeastOneInternal(1,e)}AT_LEAST_ONE2(e){this.atLeastOneInternal(2,e)}AT_LEAST_ONE3(e){this.atLeastOneInternal(3,e)}AT_LEAST_ONE4(e){this.atLeastOneInternal(4,e)}AT_LEAST_ONE5(e){this.atLeastOneInternal(5,e)}AT_LEAST_ONE6(e){this.atLeastOneInternal(6,e)}AT_LEAST_ONE7(e){this.atLeastOneInternal(7,e)}AT_LEAST_ONE8(e){this.atLeastOneInternal(8,e)}AT_LEAST_ONE9(e){this.atLeastOneInternal(9,e)}AT_LEAST_ONE_SEP(e){this.atLeastOneSepFirstInternal(0,e)}AT_LEAST_ONE_SEP1(e){this.atLeastOneSepFirstInternal(1,e)}AT_LEAST_ONE_SEP2(e){this.atLeastOneSepFirstInternal(2,e)}AT_LEAST_ONE_SEP3(e){this.atLeastOneSepFirstInternal(3,e)}AT_LEAST_ONE_SEP4(e){this.atLeastOneSepFirstInternal(4,e)}AT_LEAST_ONE_SEP5(e){this.atLeastOneSepFirstInternal(5,e)}AT_LEAST_ONE_SEP6(e){this.atLeastOneSepFirstInternal(6,e)}AT_LEAST_ONE_SEP7(e){this.atLeastOneSepFirstInternal(7,e)}AT_LEAST_ONE_SEP8(e){this.atLeastOneSepFirstInternal(8,e)}AT_LEAST_ONE_SEP9(e){this.atLeastOneSepFirstInternal(9,e)}RULE(e,r,n=Hs){if(Me(this.definedRulesNames,e)){let s={message:jr.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),type:ht.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(s)}this.definedRulesNames.push(e);let i=this.defineRule(e,r,n);return this[e]=i,i}OVERRIDE_RULE(e,r,n=Hs){let i=pb(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);let o=this.defineRule(e,r,n);return this[e]=o,o}BACKTRACK(e,r){return function(){this.isBackTrackingStack.push(1);let n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if(ni(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}}getGAstProductions(){return this.gastProductionsCache}getSerializedGastProductions(){return Yl(ge(this.gastProductionsCache))}};var Sd=class{initRecognizerEngine(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=Fs,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},F(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if(q(e)){if(Z(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if(q(e))this.tokensMap=Ke(e,(o,s)=>(o[s.name]=s,o),{});else if(F(e,"modes")&&Nt(nt(ge(e.modes)),HS)){let o=nt(ge(e.modes)),s=Os(o);this.tokensMap=Ke(s,(a,c)=>(a[c.name]=c,a),{})}else if(Ge(e))this.tokensMap=be(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=yr;let n=F(e,"modes")?nt(ge(e.modes)):ge(e),i=Nt(n,o=>Z(o.categoryMatches));this.tokenMatcher=i?Fs:bn,En(ge(this.tokensMap))}defineRule(e,r,n){if(this.selfAnalysisDone)throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);let i=F(n,"resyncEnabled")?n.resyncEnabled:Hs.resyncEnabled,o=F(n,"recoveryValueFunc")?n.recoveryValueFunc:Hs.recoveryValueFunc,s=this.ruleShortNameIdx<<12;this.ruleShortNameIdx++,this.shortRuleNameToFull[s]=e,this.fullRuleNameToShort[e]=s;let a;return this.outputCst===!0?a=function(...l){try{this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,l);let d=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(d),d}catch(d){return this.invokeRuleCatch(d,i,o)}finally{this.ruleFinallyStateUpdate()}}:a=function(...l){try{return this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,l)}catch(d){return this.invokeRuleCatch(d,i,o)}finally{this.ruleFinallyStateUpdate()}},Object.assign(a,{ruleName:e,originalGrammarAction:r})}invokeRuleCatch(e,r,n){let i=this.RULE_STACK.length===1,o=r&&!this.isBackTracking()&&this.recoveryEnabled;if(ni(e)){let s=e;if(o){let a=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(a))if(s.resyncedTokens=this.reSyncTo(a),this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];return c.recoveredNode=!0,c}else return n(e);else{if(this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];c.recoveredNode=!0,s.partialCstResult=c}throw s}}else{if(i)return this.moveToTerminatedState(),n(e);throw s}}else throw e}optionInternal(e,r){let n=this.getKeyForAutomaticLookahead(512,r);return this.optionInternalLogic(e,r,n)}optionInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;let s=e.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=e;if(i.call(this)===!0)return o.call(this)}atLeastOneInternal(e,r){let n=this.getKeyForAutomaticLookahead(1024,e);return this.atLeastOneInternalLogic(e,r,n)}atLeastOneInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let s=r.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=r;if(i.call(this)===!0){let s=this.doSingleRepetition(o);for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o)}else throw this.raiseEarlyExitException(e,qe.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],i,1024,e,od)}atLeastOneSepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1536,e);this.atLeastOneSepFirstInternalLogic(e,r,n)}atLeastOneSepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Tc],a,1536,e,Tc)}else throw this.raiseEarlyExitException(e,qe.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)}manyInternal(e,r){let n=this.getKeyForAutomaticLookahead(768,e);return this.manyInternalLogic(e,r,n)}manyInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let a=r.GATE;if(a!==void 0){let c=i;i=()=>a.call(this)&&c.call(this)}}else o=r;let s=!0;for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],i,768,e,id,s)}manySepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1280,e);this.manySepFirstInternalLogic(e,r,n)}manySepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,xc],a,1280,e,xc)}}repetitionSepSecondInternal(e,r,n,i,o){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,o],n,1536,e,o)}doSingleRepetition(e){let r=this.getLexerPosition();return e.call(this),this.getLexerPosition()>r}orInternal(e,r){let n=this.getKeyForAutomaticLookahead(256,r),i=q(e)?e:e.DEF,s=this.getLaFuncFromCache(n).call(this,i);if(s!==void 0)return i[s].ALT.call(this);this.raiseNoAltException(r,e.ERR_MSG)}ruleFinallyStateUpdate(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){let e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Ec(r,e))}}subruleInternal(e,r,n){let i;try{let o=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,o),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}}subruleInternalError(e,r,n){throw ni(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e}consumeInternal(e,r,n){let i;try{let o=this.LA(1);this.tokenMatcher(o,e)===!0?(this.consumeToken(),i=o):this.consumeInternalError(e,o,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i}consumeInternalError(e,r,n){let i,o=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Wi(i,r,o))}consumeInternalRecovery(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){let i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(o){throw o.name===wh?n:o}}else throw n}saveRecogState(){let e=this.errors,r=be(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}}reloadRecogState(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK}ruleInvocationStateUpdate(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)}isBackTracking(){return this.isBackTrackingStack.length!==0}getCurrRuleFullName(){let e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]}shortRuleNameToFullName(e){return this.shortRuleNameToFull[e]}isAtEndOfInput(){return this.tokenMatcher(this.LA(1),yr)}reset(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]}};var bd=class{initErrorHandler(e){this._errors=[],this.errorMessageProvider=F(e,"errorMessageProvider")?e.errorMessageProvider:Ht.errorMessageProvider}SAVE_ERROR(e){if(ni(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:be(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")}get errors(){return be(this._errors)}set errors(e){this._errors=e}raiseEarlyExitException(e,r,n){let i=this.getCurrRuleFullName(),o=this.getGAstProductions()[i],a=Bs(e,o,r,this.maxLookahead)[0],c=[];for(let l=1;l<=this.maxLookahead;l++)c.push(this.LA(l));let u=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:a,actual:c,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new Cc(u,this.LA(1),this.LA(0)))}raiseNoAltException(e,r){let n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],o=Us(e,i,this.maxLookahead),s=[];for(let u=1;u<=this.maxLookahead;u++)s.push(this.LA(u));let a=this.LA(0),c=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:o,actual:s,previous:a,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new bc(c,this.LA(1),a))}};var Ed=class{initContentAssist(){}computeContentAssist(e,r){let n=this.gastProductionsCache[e];if(Ot(n))throw Error(`Rule ->${e}<- does not exist in this grammar.`);return ad([n],r,this.tokenMatcher,this.maxLookahead)}getNextPossibleTokenTypes(e){let r=xt(e.ruleStack),i=this.getGAstProductions()[r];return new nd(i,e).startWalking()}};var Ad={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(Ad);var kb=!0,wb=Math.pow(2,8)-1,Nb=ri({name:"RECORDING_PHASE_TOKEN",pattern:Fe.NA});En([Nb]);var Ob=_n(Nb,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(Ob);var DL={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},Cd=class{initGastRecorder(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1}enableRecording(){this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",()=>{for(let e=0;e<10;e++){let r=e>0?e:"";this[`CONSUME${r}`]=function(n,i){return this.consumeInternalRecord(n,e,i)},this[`SUBRULE${r}`]=function(n,i){return this.subruleInternalRecord(n,e,i)},this[`OPTION${r}`]=function(n){return this.optionInternalRecord(n,e)},this[`OR${r}`]=function(n){return this.orInternalRecord(n,e)},this[`MANY${r}`]=function(n){this.manyInternalRecord(e,n)},this[`MANY_SEP${r}`]=function(n){this.manySepFirstInternalRecord(e,n)},this[`AT_LEAST_ONE${r}`]=function(n){this.atLeastOneInternalRecord(e,n)},this[`AT_LEAST_ONE_SEP${r}`]=function(n){this.atLeastOneSepFirstInternalRecord(e,n)}}this.consume=function(e,r,n){return this.consumeInternalRecord(r,e,n)},this.subrule=function(e,r,n){return this.subruleInternalRecord(r,e,n)},this.option=function(e,r){return this.optionInternalRecord(r,e)},this.or=function(e,r){return this.orInternalRecord(r,e)},this.many=function(e,r){this.manyInternalRecord(e,r)},this.atLeastOne=function(e,r){this.atLeastOneInternalRecord(e,r)},this.ACTION=this.ACTION_RECORD,this.BACKTRACK=this.BACKTRACK_RECORD,this.LA=this.LA_RECORD})}disableRecording(){this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",()=>{let e=this;for(let r=0;r<10;r++){let n=r>0?r:"";delete e[`CONSUME${n}`],delete e[`SUBRULE${n}`],delete e[`OPTION${n}`],delete e[`OR${n}`],delete e[`MANY${n}`],delete e[`MANY_SEP${n}`],delete e[`AT_LEAST_ONE${n}`],delete e[`AT_LEAST_ONE_SEP${n}`]}delete e.consume,delete e.subrule,delete e.option,delete e.or,delete e.many,delete e.atLeastOne,delete e.ACTION,delete e.BACKTRACK,delete e.LA})}ACTION_RECORD(e){}BACKTRACK_RECORD(e,r){return()=>!0}LA_RECORD(e){return Gs}topLevelRuleRecord(e,r){try{let n=new Wt({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(n){if(n.KNOWN_RECORDER_ERROR!==!0)try{n.message=n.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw n}throw n}}optionInternalRecord(e,r){return Ac.call(this,me,e,r)}atLeastOneInternalRecord(e,r){Ac.call(this,Ce,r,e)}atLeastOneSepFirstInternalRecord(e,r){Ac.call(this,_e,r,e,kb)}manyInternalRecord(e,r){Ac.call(this,se,r,e)}manySepFirstInternalRecord(e,r){Ac.call(this,ve,r,e,kb)}orInternalRecord(e,r){return $L.call(this,e,r)}subruleInternalRecord(e,r,n){if(_d(r),!e||F(e,"ruleName")===!1){let a=new Error(`<SUBRULE${Pb(r)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw a.KNOWN_RECORDER_ERROR=!0,a}let i=sn(this.recordingProdStack),o=e.ruleName,s=new pe({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return i.definition.push(s),this.outputCst?DL:Ad}consumeInternalRecord(e,r,n){if(_d(r),!vh(e)){let s=new Error(`<CONSUME${Pb(r)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw s.KNOWN_RECORDER_ERROR=!0,s}let i=sn(this.recordingProdStack),o=new te({idx:r,terminalType:e,label:n?.LABEL});return i.definition.push(o),Ob}};function Ac(t,e,r,n=!1){_d(r);let i=sn(this.recordingProdStack),o=Bt(e)?e:e.DEF,s=new t({definition:[],idx:r});return n&&(s.separator=e.SEP),F(e,"MAX_LOOKAHEAD")&&(s.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(s),o.call(this),i.definition.push(s),this.recordingProdStack.pop(),Ad}function $L(t,e){_d(e);let r=sn(this.recordingProdStack),n=q(t)===!1,i=n===!1?t:t.DEF,o=new xe({definition:[],idx:e,ignoreAmbiguities:n&&t.IGNORE_AMBIGUITIES===!0});F(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);let s=fc(i,a=>Bt(a.GATE));return o.hasPredicates=s,r.definition.push(o),D(i,a=>{let c=new Ee({definition:[]});o.definition.push(c),F(a,"IGNORE_AMBIGUITIES")?c.ignoreAmbiguities=a.IGNORE_AMBIGUITIES:F(a,"GATE")&&(c.ignoreAmbiguities=!0),this.recordingProdStack.push(c),a.ALT.call(this),this.recordingProdStack.pop()}),Ad}function Pb(t){return t===0?"":`${t}`}function _d(t){if(t<0||t>wb){let e=new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${wb+1}`);throw e.KNOWN_RECORDER_ERROR=!0,e}}var kd=class{initPerformanceTracer(e){if(F(e,"traceInitPerf")){let r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=Ht.traceInitPerf;this.traceInitIndent=-1}TRACE_INIT(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;let n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${n}--> <${e}>`);let{time:i,value:o}=mc(r),s=i>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s(`${n}<-- <${e}> time: ${i}ms`),this.traceInitIndent--,o}else return r()}};function Ib(t,e){e.forEach(r=>{let n=r.prototype;Object.getOwnPropertyNames(n).forEach(i=>{if(i==="constructor")return;let o=Object.getOwnPropertyDescriptor(n,i);o&&(o.get||o.set)?Object.defineProperty(t.prototype,i,o):t.prototype[i]=r.prototype[i]})})}var Gs=_n(yr,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(Gs);var Ht=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:An,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),Hs=Object.freeze({recoveryValueFunc:()=>{},resyncEnabled:!0}),ht;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(ht||(ht={}));function wd(t=void 0){return function(){return t}}var kc=class t{static performSelfAnalysis(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")}performSelfAnalysis(){this.TRACE_INIT("performSelfAnalysis",()=>{let e;this.selfAnalysisDone=!0;let r=this.className;this.TRACE_INIT("toFastProps",()=>{hc(this)}),this.TRACE_INIT("Grammar Recording",()=>{try{this.enableRecording(),D(this.definedRulesNames,i=>{let s=this[i].originalGrammarAction,a;this.TRACE_INIT(`${i} Rule`,()=>{a=this.topLevelRuleRecord(i,s)}),this.gastProductionsCache[i]=a})}finally{this.disableRecording()}});let n=[];if(this.TRACE_INIT("Grammar Resolving",()=>{n=yb({rules:ge(this.gastProductionsCache)}),this.definitionErrors=this.definitionErrors.concat(n)}),this.TRACE_INIT("Grammar Validations",()=>{if(Z(n)&&this.skipValidations===!1){let i=vb({rules:ge(this.gastProductionsCache),tokenTypes:ge(this.tokensMap),errMsgProvider:jr,grammarName:r}),o=lb({lookaheadStrategy:this.lookaheadStrategy,rules:ge(this.gastProductionsCache),tokenTypes:ge(this.tokensMap),grammarName:r});this.definitionErrors=this.definitionErrors.concat(i,o)}}),Z(this.definitionErrors)&&(this.recoveryEnabled&&this.TRACE_INIT("computeAllProdsFollows",()=>{let i=CS(ge(this.gastProductionsCache));this.resyncFollows=i}),this.TRACE_INIT("ComputeLookaheadFunctions",()=>{var i,o;(o=(i=this.lookaheadStrategy).initialize)===null||o===void 0||o.call(i,{rules:ge(this.gastProductionsCache)}),this.preComputeLookaheadFunctions(ge(this.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!Z(this.definitionErrors))throw e=P(this.definitionErrors,i=>i.message),new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)})}constructor(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;let n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),F(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=F(r,"skipValidations")?r.skipValidations:Ht.skipValidations}};kc.DEFER_DEFINITION_ERRORS_HANDLING=!1;Ib(kc,[fd,hd,xd,Td,Sd,Rd,bd,Ed,Cd,kd]);var wc=class extends kc{constructor(e,r=Ht){let n=be(r);n.outputCst=!1,super(e,n)}};function Gi(t,e,r){return`${t.name}_${e}_${r}`}var ii=1,LL=2,Db=4,$b=5;var zs=7,FL=8,qL=9,jL=10,UL=11,Mb=12,Pc=class{constructor(e){this.target=e}isEpsilon(){return!1}},Ks=class extends Pc{constructor(e,r){super(e),this.tokenType=r}},Nc=class extends Pc{constructor(e){super(e)}isEpsilon(){return!0}},Vs=class extends Pc{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};function Lb(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};BL(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],o=Hi(e,i,i);o!==void 0&&ZL(e,i,o)}return e}function BL(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],o=Tt(t,i,void 0,{type:LL}),s=Tt(t,i,void 0,{type:zs});o.stop=s,t.ruleToStartState.set(i,o),t.ruleToStopState.set(i,s)}}function Fb(t,e,r){return r instanceof te?Fh(t,e,r.terminalType,r):r instanceof pe?QL(t,e,r):r instanceof xe?VL(t,e,r):r instanceof me?zL(t,e,r):r instanceof se?WL(t,e,r):r instanceof ve?GL(t,e,r):r instanceof Ce?HL(t,e,r):r instanceof _e?KL(t,e,r):Hi(t,e,r)}function WL(t,e,r){let n=Tt(t,e,r,{type:$b});oi(t,n);let i=Xs(t,e,n,r,Hi(t,e,r));return jb(t,e,r,i)}function GL(t,e,r){let n=Tt(t,e,r,{type:$b});oi(t,n);let i=Xs(t,e,n,r,Hi(t,e,r)),o=Fh(t,e,r.separator,r);return jb(t,e,r,i,o)}function HL(t,e,r){let n=Tt(t,e,r,{type:Db});oi(t,n);let i=Xs(t,e,n,r,Hi(t,e,r));return qb(t,e,r,i)}function KL(t,e,r){let n=Tt(t,e,r,{type:Db});oi(t,n);let i=Xs(t,e,n,r,Hi(t,e,r)),o=Fh(t,e,r.separator,r);return qb(t,e,r,i,o)}function VL(t,e,r){let n=Tt(t,e,r,{type:ii});oi(t,n);let i=P(r.definition,s=>Fb(t,e,s));return Xs(t,e,n,r,...i)}function zL(t,e,r){let n=Tt(t,e,r,{type:ii});oi(t,n);let i=Xs(t,e,n,r,Hi(t,e,r));return XL(t,e,r,i)}function Hi(t,e,r){let n=vt(P(r.definition,i=>Fb(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:JL(t,n)}function qb(t,e,r,n,i){let o=n.left,s=n.right,a=Tt(t,e,r,{type:UL});oi(t,a);let c=Tt(t,e,r,{type:Mb});return o.loopback=a,c.loopback=a,t.decisionMap[Gi(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=a,ct(s,a),i===void 0?(ct(a,o),ct(a,c)):(ct(a,c),ct(a,i.left),ct(i.right,o)),{left:o,right:c}}function jb(t,e,r,n,i){let o=n.left,s=n.right,a=Tt(t,e,r,{type:jL});oi(t,a);let c=Tt(t,e,r,{type:Mb}),u=Tt(t,e,r,{type:qL});return a.loopback=u,c.loopback=u,ct(a,o),ct(a,c),ct(s,u),i!==void 0?(ct(u,c),ct(u,i.left),ct(i.right,o)):ct(u,a),t.decisionMap[Gi(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=a,{left:a,right:c}}function XL(t,e,r,n){let i=n.left,o=n.right;return ct(i,o),t.decisionMap[Gi(e,"Option",r.idx)]=i,n}function oi(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function Xs(t,e,r,n,...i){let o=Tt(t,e,n,{type:FL,start:r});r.end=o;for(let a of i)a!==void 0?(ct(r,a.left),ct(a.right,o)):ct(r,o);let s={left:r,right:o};return t.decisionMap[Gi(e,YL(n),n.idx)]=r,s}function YL(t){if(t instanceof xe)return"Alternation";if(t instanceof me)return"Option";if(t instanceof se)return"Repetition";if(t instanceof ve)return"RepetitionWithSeparator";if(t instanceof Ce)return"RepetitionMandatory";if(t instanceof _e)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function JL(t,e){let r=e.length;for(let o=0;o<r-1;o++){let s=e[o],a;s.left.transitions.length===1&&(a=s.left.transitions[0]);let c=a instanceof Vs,u=a,l=e[o+1].left;s.left.type===ii&&s.right.type===ii&&a!==void 0&&(c&&u.followState===s.right||a.target===s.right)?(c?u.followState=l:a.target=l,eF(t,s.right)):ct(s.right,l)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function Fh(t,e,r,n){let i=Tt(t,e,n,{type:ii}),o=Tt(t,e,n,{type:ii});return qh(i,new Ks(o,r)),{left:i,right:o}}function QL(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),o=Tt(t,e,r,{type:ii}),s=Tt(t,e,r,{type:ii}),a=new Vs(i,n,s);return qh(o,a),{left:o,right:s}}function ZL(t,e,r){let n=t.ruleToStartState.get(e);ct(n,r.left);let i=t.ruleToStopState.get(e);return ct(r.right,i),{left:n,right:i}}function ct(t,e){let r=new Nc(e);qh(t,r)}function Tt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function qh(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function eF(t,e){t.states.splice(t.states.indexOf(e),1)}var Oc={},Ys=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=jh(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return P(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};function jh(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}function tF(t,e){let r={};return n=>{let i=n.toString(),o=r[i];return o!==void 0||(o={atnStartState:t,decision:e,states:{}},r[i]=o),o}}var Pd=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},Ub=new Pd,Ic=class extends kn{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=Lb(e.rules),this.dfas=rF(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Gi(n,"Alternation",r),l=this.atn.decisionMap[c].decision,d=P(ud({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),f=>P(f,m=>m[0]));if(Bb(d,!1)&&!o){let f=Ke(d,(m,v,T)=>(D(v,C=>{C&&(m[C.tokenTypeIdx]=T,D(C.categoryMatches,R=>{m[R]=T}))}),m),{});return i?function(m){var v;let T=this.LA(1),C=f[T.tokenTypeIdx];if(m!==void 0&&C!==void 0){let R=(v=m[C])===null||v===void 0?void 0:v.GATE;if(R!==void 0&&R.call(this)===!1)return}return C}:function(){let m=this.LA(1);return f[m.tokenTypeIdx]}}else return i?function(f){let m=new Pd,v=f===void 0?0:f.length;for(let C=0;C<v;C++){let R=f?.[C].GATE;m.set(C,R===void 0||R.call(this))}let T=Uh.call(this,s,l,m,a);return typeof T=="number"?T:void 0}:function(){let f=Uh.call(this,s,l,Ub,a);return typeof f=="number"?f:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Gi(n,i,r),l=this.atn.decisionMap[c].decision,d=P(ud({maxLookahead:1,occurrence:r,prodType:i,rule:n}),f=>P(f,m=>m[0]));if(Bb(d)&&d[0][0]&&!o){let f=d[0],m=nt(f);if(m.length===1&&Z(m[0].categoryMatches)){let T=m[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===T}}else{let v=Ke(m,(T,C)=>(C!==void 0&&(T[C.tokenTypeIdx]=!0,D(C.categoryMatches,R=>{T[R]=!0})),T),{});return function(){let T=this.LA(1);return v[T.tokenTypeIdx]===!0}}}return function(){let f=Uh.call(this,s,l,Ub,a);return typeof f=="object"?!1:f===0}}};function Bb(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let o of n){if(o===void 0){if(e)break;return!1}let s=[o.tokenTypeIdx].concat(o.categoryMatches);for(let a of s)if(r.has(a)){if(!i.has(a))return!1}else r.add(a),i.add(a)}}return!0}function rF(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=tF(t.decisionStates[n],n);return r}function Uh(t,e,r,n){let i=t[e](r),o=i.start;if(o===void 0){let a=pF(i.atnStartState);o=Hb(i,Gb(a)),i.start=o}return nF.apply(this,[i,o,r,n])}function nF(t,e,r,n){let i=e,o=1,s=[],a=this.LA(o++);for(;;){let c=uF(i,a);if(c===void 0&&(c=iF.apply(this,[t,i,a,o,r,n])),c===Oc)return cF(s,i,a);if(c.isAcceptState===!0)return c.prediction;i=c,s.push(a),a=this.LA(o++)}}function iF(t,e,r,n,i,o){let s=lF(e.configs,r,i);if(s.size===0)return Wb(t,e,r,Oc),Oc;let a=Gb(s),c=fF(s,i);if(c!==void 0)a.isAcceptState=!0,a.prediction=c,a.configs.uniqueAlt=c;else if(yF(s)){let u=gS(s.alts);a.isAcceptState=!0,a.prediction=u,a.configs.uniqueAlt=u,oF.apply(this,[t,n,s.alts,o])}return a=Wb(t,e,r,a),a}function oF(t,e,r,n){let i=[];for(let u=1;u<=e;u++)i.push(this.LA(u).tokenType);let o=t.atnStartState,s=o.rule,a=o.production,c=sF({topLevelRule:s,ambiguityIndices:r,production:a,prefixPath:i});n(c)}function sF(t){let e=P(t.prefixPath,i=>Cn(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${aF(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function aF(t){if(t instanceof pe)return"SUBRULE";if(t instanceof me)return"OPTION";if(t instanceof xe)return"OR";if(t instanceof Ce)return"AT_LEAST_ONE";if(t instanceof _e)return"AT_LEAST_ONE_SEP";if(t instanceof ve)return"MANY_SEP";if(t instanceof se)return"MANY";if(t instanceof te)return"CONSUME";throw Error("non exhaustive match")}function cF(t,e,r){let n=_t(e.configs.elements,o=>o.state.transitions),i=bS(n.filter(o=>o instanceof Ks).map(o=>o.tokenType),o=>o.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function uF(t,e){return t.edges[e.tokenTypeIdx]}function lF(t,e,r){let n=new Ys,i=[];for(let s of t.elements){if(r.is(s.alt)===!1)continue;if(s.state.type===zs){i.push(s);continue}let a=s.state.transitions.length;for(let c=0;c<a;c++){let u=s.state.transitions[c],l=dF(u,e);l!==void 0&&n.add({state:l,alt:s.alt,stack:s.stack})}}let o;if(i.length===0&&n.size===1&&(o=n),o===void 0){o=new Ys;for(let s of n.elements)Nd(s,o)}if(i.length>0&&!hF(o))for(let s of i)o.add(s);return o}function dF(t,e){if(t instanceof Ks&&vc(e,t.tokenType))return t.target}function fF(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function Gb(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function Wb(t,e,r,n){return n=Hb(t,n),e.edges[r.tokenTypeIdx]=n,n}function Hb(t,e){if(e===Oc)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function pF(t){let e=new Ys,r=t.transitions.length;for(let n=0;n<r;n++){let o={state:t.transitions[n].target,alt:n,stack:[]};Nd(o,e)}return e}function Nd(t,e){let r=t.state;if(r.type===zs){if(t.stack.length>0){let i=[...t.stack],s={state:i.pop(),alt:t.alt,stack:i};Nd(s,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let o=r.transitions[i],s=mF(t,o);s!==void 0&&Nd(s,e)}}function mF(t,e){if(e instanceof Nc)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof Vs){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function hF(t){for(let e of t.elements)if(e.state.type===zs)return!0;return!1}function gF(t){for(let e of t.elements)if(e.state.type!==zs)return!1;return!0}function yF(t){if(gF(t))return!0;let e=vF(t.elements);return xF(e)&&!TF(e)}function vF(t){let e=new Map;for(let r of t){let n=jh(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function xF(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function TF(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}zi();var Uc=class{constructor(){this.nodeStack=[]}get current(){var e;return(e=this.nodeStack[this.nodeStack.length-1])!==null&&e!==void 0?e:this.rootNode}buildRootNode(e){return this.rootNode=new ra(e),this.rootNode.root=this.rootNode,this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new Yi;return r.grammarSource=e,r.root=this.rootNode,this.current.content.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new Xi(e.startOffset,e.image.length,xo(e),e.tokenType,!r);return n.grammarSource=r,n.root=this.rootNode,this.current.content.push(n),n}removeNode(e){let r=e.container;if(r){let n=r.content.indexOf(e);n>=0&&r.content.splice(n,1)}}addHiddenNodes(e){let r=[];for(let o of e){let s=new Xi(o.startOffset,o.image.length,xo(o),o.tokenType,!0);s.root=this.rootNode,r.push(s)}let n=this.current,i=!1;if(n.content.length>0){n.content.push(...r);return}for(;n.container;){let o=n.container.content.indexOf(n);if(o>0){n.container.content.splice(o,0,...r),i=!0;break}n=n.container}i||this.rootNode.content.unshift(...r)}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.astNode=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.content.length===0&&this.removeNode(n)}},Bc=class{get parent(){return this.container}get feature(){return this.grammarSource}get hidden(){return!1}get astNode(){var e,r;let n=typeof((e=this._astNode)===null||e===void 0?void 0:e.$type)=="string"?this._astNode:(r=this.container)===null||r===void 0?void 0:r.astNode;if(!n)throw new Error("This node has no associated AST element");return n}set astNode(e){this._astNode=e}get element(){return this.astNode}get text(){return this.root.fullText.substring(this.offset,this.end)}},Xi=class extends Bc{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,o=!1){super(),this._hidden=o,this._offset=e,this._tokenType=i,this._length=r,this._range=n}},Yi=class extends Bc{constructor(){super(...arguments),this.content=new Gg(this)}get children(){return this.content}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:ue.create(0,0),end:ue.create(0,0)}}get firstNonHiddenNode(){for(let e of this.content)if(!e.hidden)return e;return this.content[0]}get lastNonHiddenNode(){for(let e=this.content.length-1;e>=0;e--){let r=this.content[e];if(!r.hidden)return r}return this.content[this.content.length-1]}},Gg=class t extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,t.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.container=this.parent}},ra=class extends Yi{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};var Ud=Symbol("Datatype");function Hg(t){return t.$type===Ud}var Kb="\u200B",Vb=t=>t.endsWith(Kb)?t:t+Kb,Wc=class{constructor(e){this._unorderedGroups=new Map,this.allRules=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition,n=e.LanguageMetaData.mode==="production";this.wrapper=new Kg(r,Object.assign(Object.assign({},e.parser.ParserConfig),{skipValidations:n,errorMessageProvider:e.parser.ParserErrorMessageProvider}))}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}getRule(e){return this.allRules.get(e)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}},Gc=class extends Wc{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new Uc,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=this.computeRuleType(e),i=this.wrapper.DEFINE_RULE(Vb(e.name),this.startImplementation(n,r).bind(this));return this.allRules.set(e.name,i),e.entry&&(this.mainRule=i),i}computeRuleType(e){if(!e.fragment){if(cc(e))return Ud;{let r=Xr(e);return r??e.name}}}parse(e,r={}){this.nodeBuilder.buildRootNode(e);let n=this.lexerResult=this.lexer.tokenize(e);this.wrapper.input=n.tokens;let i=r.rule?this.allRules.get(r.rule):this.mainRule;if(!i)throw new Error(r.rule?`No rule found with name '${r.rule}'`:"No main rule available.");let o=this.doParse(i);return this.nodeBuilder.addHiddenNodes(n.hidden),this.unorderedGroups.clear(),this.lexerResult=void 0,{value:o,lexerErrors:n.errors,lexerReport:n.report,parserErrors:this.wrapper.errors}}doParse(e){let r=e.call(this.wrapper,{});if(this.stack.length>0&&(r=this.construct()),r===void 0)throw new Error("No result from parser");if(this.stack.length>0)throw new Error("Parser stack is not empty after parsing");return r}startImplementation(e,r){return n=>{let i=!this.isRecording()&&e!==void 0;if(i){let o={$type:e};this.stack.push(o),e===Ud&&(o.value="")}return r(n),i?this.construct():void 0}}extractHiddenTokens(e){let r=this.lexerResult.hidden;if(!r.length)return[];let n=e.startOffset;for(let i=0;i<r.length;i++)if(r[i].startOffset>n)return r.splice(0,i);return r.splice(0,r.length)}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&this.isValidToken(i)){let o=this.extractHiddenTokens(i);this.nodeBuilder.addHiddenNodes(o);let s=this.nodeBuilder.buildLeafNode(i,n),{assignment:a,isCrossRef:c}=this.getAssignment(n),u=this.current;if(a){let l=pt(n)?i.image:this.converter.convert(i.image,s);this.assign(a.operator,a.feature,l,s,c)}else if(Hg(u)){let l=i.image;pt(n)||(l=this.converter.convert(l,s).toString()),u.value+=l}}}isValidToken(e){return!e.isInsertedInRecovery&&!isNaN(e.startOffset)&&typeof e.endOffset=="number"&&!isNaN(e.endOffset)}subrule(e,r,n,i,o){let s;!this.isRecording()&&!n&&(s=this.nodeBuilder.buildCompositeNode(i));let a;try{a=this.wrapper.wrapSubrule(e,r,o)}finally{this.isRecording()||(a===void 0&&!n&&(a=this.construct()),a!==void 0&&s&&s.length>0&&this.performSubruleAssignment(a,i,s))}}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:o}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,o);else if(!i){let s=this.current;if(Hg(s))s.value+=e.toString();else if(typeof e=="object"&&e){let c=this.assignWithoutOverride(e,s);this.stack.pop(),this.stack.push(c)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(r.feature&&r.operator){n=this.construct(),this.nodeBuilder.removeNode(n.$cstNode),this.nodeBuilder.buildCompositeNode(r).content.push(n.$cstNode);let o={$type:e};this.stack.push(o),this.assign(r.operator,r.feature,n,n.$cstNode,!1)}else n.$type=e}}construct(){if(this.isRecording())return;let e=this.current;return ml(e),this.nodeBuilder.construct(e),this.stack.pop(),Hg(e)?this.converter.convert(e.value,e.$cstNode):(Za(this.astReflection,e),e)}getAssignment(e){if(!this.assignmentMap.has(e)){let r=mr(e,Pt);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?pr(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,o){let s=this.current,a;switch(o&&typeof n=="string"?a=this.linker.buildReference(s,r,i,n):a=n,e){case"=":{s[r]=a;break}case"?=":{s[r]=!0;break}case"+=":Array.isArray(s[r])||(s[r]=[]),s[r].push(a)}}assignWithoutOverride(e,r){for(let[i,o]of Object.entries(r)){let s=e[i];s===void 0?e[i]=o:Array.isArray(s)&&Array.isArray(o)&&(o.push(...s),e[i]=o)}let n=e.$cstNode;return n&&(n.astNode=void 0,e.$cstNode=void 0),e}get definitionErrors(){return this.wrapper.definitionErrors}},Bd=class{buildMismatchTokenMessage(e){return An.buildMismatchTokenMessage(e)}buildNotAllInputParsedMessage(e){return An.buildNotAllInputParsedMessage(e)}buildNoViableAltMessage(e){return An.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return An.buildEarlyExitMessage(e)}},na=class extends Bd{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}},Hc=class extends Wc{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e,{mode:"partial"});return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(Vb(e.name),this.startImplementation(r).bind(this));return this.allRules.set(e.name,n),e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i,o){this.before(i),this.wrapper.wrapSubrule(e,r,o),this.after(i)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}},SF={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new na},Kg=class extends wc{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},SF),{lookaheadStrategy:n?new kn({maxLookahead:r.maxLookahead}):new Ic({logging:r.skipValidations?()=>{}:void 0})}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r,n){return this.RULE(e,r,n)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r,void 0)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}};function Kc(t,e,r){return bF({parser:e,tokens:r,ruleNames:new Map},t),e}function bF(t,e){let r=oc(e,!1),n=ee(e.rules).filter($e).filter(i=>r.has(i));for(let i of n){let o=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});t.parser.rule(i,Ji(o,i.definition))}}function Ji(t,e,r=!1){let n;if(pt(e))n=PF(t,e);else if(Fr(e))n=EF(t,e);else if(Pt(e))n=Ji(t,e.terminal);else if(pr(e))n=zb(t,e);else if(Zt(e))n=CF(t,e);else if(os(e))n=AF(t,e);else if(ss(e))n=kF(t,e);else if(Rr(e))n=wF(t,e);else if(Pm(e)){let i=t.consume++;n=()=>t.parser.consume(i,yr,e)}else throw new Ai(e.$cstNode,`Unexpected element type: ${e.$type}`);return Xb(t,r?void 0:Wd(e),n,e.cardinality)}function EF(t,e){let r=Li(e);return()=>t.parser.action(r,e)}function CF(t,e){let r=e.rule.ref;if($e(r)){let n=t.subrule++,i=r.fragment,o=e.arguments.length>0?_F(r,e.arguments):()=>({});return s=>t.parser.subrule(n,Yb(t,r),i,e,o(s))}else if(jt(r)){let n=t.consume++,i=Vg(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)Vr(r);else throw new Ai(e.$cstNode,`Undefined rule: ${e.rule.$refText}`)}function _F(t,e){let r=e.map(n=>Pn(n.value));return n=>{let i={};for(let o=0;o<r.length;o++){let s=t.parameters[o],a=r[o];i[s.name]=a(n)}return i}}function Pn(t){if(bm(t)){let e=Pn(t.left),r=Pn(t.right);return n=>e(n)||r(n)}else if(Sm(t)){let e=Pn(t.left),r=Pn(t.right);return n=>e(n)&&r(n)}else if(Em(t)){let e=Pn(t.value);return r=>!e(r)}else if(Cm(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if(Rm(t)){let e=!!t.true;return()=>e}Vr(t)}function AF(t,e){if(e.elements.length===1)return Ji(t,e.elements[0]);{let r=[];for(let i of e.elements){let o={ALT:Ji(t,i,!0)},s=Wd(i);s&&(o.GATE=Pn(s)),r.push(o)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(o=>{let s={ALT:()=>o.ALT(i)},a=o.GATE;return a&&(s.GATE=()=>a(i)),s}))}}function kF(t,e){if(e.elements.length===1)return Ji(t,e.elements[0]);let r=[];for(let a of e.elements){let c={ALT:Ji(t,a,!0)},u=Wd(a);u&&(c.GATE=Pn(u)),r.push(c)}let n=t.or++,i=(a,c)=>{let u=c.getRuleStack().join("-");return`uGroup_${a}_${u}`},o=a=>t.parser.alternatives(n,r.map((c,u)=>{let l={ALT:()=>!0},d=t.parser;l.ALT=()=>{if(c.ALT(a),!d.isRecording()){let m=i(n,d);d.unorderedGroups.get(m)||d.unorderedGroups.set(m,[]);let v=d.unorderedGroups.get(m);typeof v?.[u]>"u"&&(v[u]=!0)}};let f=c.GATE;return f?l.GATE=()=>f(a):l.GATE=()=>{let m=d.unorderedGroups.get(i(n,d));return!m?.[u]},l})),s=Xb(t,Wd(e),o,"*");return a=>{s(a),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function wF(t,e){let r=e.elements.map(n=>Ji(t,n));return n=>r.forEach(i=>i(n))}function Wd(t){if(Rr(t))return t.guardCondition}function zb(t,e,r=e.terminal){if(r)if(Zt(r)&&$e(r.rule.ref)){let n=r.rule.ref,i=t.subrule++;return o=>t.parser.subrule(i,Yb(t,n),!1,e,o)}else if(Zt(r)&&jt(r.rule.ref)){let n=t.consume++,i=Vg(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if(pt(r)){let n=t.consume++,i=Vg(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=vl(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+Li(e.type.ref));return zb(t,e,i)}}function PF(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function Xb(t,e,r,n){let i=e&&Pn(e);if(!n)if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>r(s),GATE:()=>i(s)},{ALT:wd(),GATE:()=>!i(s)}])}else return r;if(n==="*"){let o=t.many++;return s=>t.parser.many(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else if(n==="+"){let o=t.many++;if(i){let s=t.or++;return a=>t.parser.alternatives(s,[{ALT:()=>t.parser.atLeastOne(o,{DEF:()=>r(a)}),GATE:()=>i(a)},{ALT:wd(),GATE:()=>!i(a)}])}else return s=>t.parser.atLeastOne(o,{DEF:()=>r(s)})}else if(n==="?"){let o=t.optional++;return s=>t.parser.optional(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else Vr(n)}function Yb(t,e){let r=NF(t,e),n=t.parser.getRule(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function NF(t,e){if($e(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!$e(n);)(Rr(n)||os(n)||ss(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function Vg(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}function zg(t){let e=t.Grammar,r=t.parser.Lexer,n=new Hc(t);return Kc(e,n,r.definition),n.finalize(),n}function Xg(t){let e=Jb(t);return e.finalize(),e}function Jb(t){let e=t.Grammar,r=t.parser.Lexer,n=new Gc(t);return Kc(e,n,r.definition)}var Qi=class{constructor(){this.diagnostics=[]}buildTokens(e,r){let n=ee(oc(e,!1)),i=this.buildTerminalTokens(n),o=this.buildKeywordTokens(n,i,r);return o.push(...i),o}flushLexingReport(e){return{diagnostics:this.popDiagnostics()}}popDiagnostics(){let e=[...this.diagnostics];return this.diagnostics=[],e}buildTerminalTokens(e){return e.filter(jt).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=Un(e),n=this.requiresCustomPattern(r)?this.regexPatternFunction(r):r,i={name:e.name,PATTERN:n};return typeof n=="function"&&(i.LINE_BREAKS=!0),e.hidden&&(i.GROUP=nc(r)?Fe.SKIPPED:"hidden"),i}requiresCustomPattern(e){return e.flags.includes("u")||e.flags.includes("s")?!0:!!(e.source.includes("?<=")||e.source.includes("?<!"))}regexPatternFunction(e){let r=new RegExp(e,e.flags+"y");return(n,i)=>(r.lastIndex=i,r.exec(n))}buildKeywordTokens(e,r,n){return e.filter($e).flatMap(i=>hr(i).filter(pt)).distinct(i=>i.value).toArray().sort((i,o)=>o.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,!!n?.caseInsensitive))}buildKeywordToken(e,r,n){let i=this.buildKeywordPattern(e,n),o={name:e.value,PATTERN:i,LONGER_ALT:this.findLongerAlt(e,r)};return typeof i=="function"&&(o.LINE_BREAKS=!0),o}buildKeywordPattern(e,r){return r?new RegExp(jn(e.value),"i"):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let o=i?.PATTERN;return o?.source&&Gm("^"+o.source+"$",e.value)&&n.push(i),n},[])}};var Vc=class{convert(e,r){let n=r.grammarSource;if(pr(n)&&(n=sc(n)),Zt(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return un.convertInt(r);case"STRING":return un.convertString(r);case"ID":return un.convertID(r)}switch((i=eh(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return un.convertNumber(r);case"boolean":return un.convertBoolean(r);case"bigint":return un.convertBigint(r);case"date":return un.convertDate(r);default:return r}}},un;(function(t){function e(u){let l="";for(let d=1;d<u.length-1;d++){let f=u.charAt(d);if(f==="\\"){let m=u.charAt(++d);l+=r(m)}else l+=f}return l}t.convertString=e;function r(u){switch(u){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return u}}function n(u){return u.charAt(0)==="^"?u.substring(1):u}t.convertID=n;function i(u){return parseInt(u)}t.convertInt=i;function o(u){return BigInt(u)}t.convertBigint=o;function s(u){return new Date(u)}t.convertDate=s;function a(u){return Number(u)}t.convertNumber=a;function c(u){return u.toLowerCase()==="true"}t.convertBoolean=c})(un||(un={}));var G={};ae(G,Jt(zc(),1));function ry(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}var Vd=0,tE=10;function zd(){return Vd=performance.now(),new G.CancellationTokenSource}function rE(t){tE=t}var ln=Symbol("OperationCancelled");function _r(t){return t===ln}async function Ve(t){if(t===G.CancellationToken.None)return;let e=performance.now();if(e-Vd>=tE&&(Vd=e,await ry(),Vd=performance.now()),t.isCancellationRequested)throw ln}var Kt=class{constructor(){this.promise=new Promise((e,r)=>{this.resolve=n=>(e(n),this),this.reject=n=>(r(n),this)})}};var Xd=class t{constructor(e,r,n,i){this._uri=e,this._languageId=r,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let r=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(r,n)}return this._content}update(e,r){for(let n of e)if(t.isIncremental(n)){let i=oE(n.range),o=this.offsetAt(i.start),s=this.offsetAt(i.end);this._content=this._content.substring(0,o)+n.text+this._content.substring(s,this._content.length);let a=Math.max(i.start.line,0),c=Math.max(i.end.line,0),u=this._lineOffsets,l=nE(n.text,!1,o);if(c-a===l.length)for(let f=0,m=l.length;f<m;f++)u[f+a+1]=l[f];else l.length<1e4?u.splice(a+1,c-a,...l):this._lineOffsets=u=u.slice(0,a+1).concat(l,u.slice(c+1));let d=n.text.length-(s-o);if(d!==0)for(let f=a+1+l.length,m=u.length;f<m;f++)u[f]=u[f]+d}else if(t.isFull(n))this._content=n.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=r}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=nE(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let r=this.getLineOffsets(),n=0,i=r.length;if(i===0)return{line:0,character:e};for(;n<i;){let s=Math.floor((n+i)/2);r[s]>e?i=s:n=s+1}let o=n-1;return e=this.ensureBeforeEOL(e,r[o]),{line:o,character:e-r[o]}}offsetAt(e){let r=this.getLineOffsets();if(e.line>=r.length)return this._content.length;if(e.line<0)return 0;let n=r[e.line];if(e.character<=0)return n;let i=e.line+1<r.length?r[e.line+1]:this._content.length,o=Math.min(n+e.character,i);return this.ensureBeforeEOL(o,n)}ensureBeforeEOL(e,r){for(;e>r&&iE(this._content.charCodeAt(e-1));)e--;return e}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range!==void 0&&(r.rangeLength===void 0||typeof r.rangeLength=="number")}static isFull(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range===void 0&&r.rangeLength===void 0}},ai;(function(t){function e(i,o,s,a){return new Xd(i,o,s,a)}t.create=e;function r(i,o,s){if(i instanceof Xd)return i.update(o,s),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}t.update=r;function n(i,o){let s=i.getText(),a=ny(o.map(UF),(l,d)=>{let f=l.range.start.line-d.range.start.line;return f===0?l.range.start.character-d.range.start.character:f}),c=0,u=[];for(let l of a){let d=i.offsetAt(l.range.start);if(d<c)throw new Error("Overlapping edit");d>c&&u.push(s.substring(c,d)),l.newText.length&&u.push(l.newText),c=i.offsetAt(l.range.end)}return u.push(s.substr(c)),u.join("")}t.applyEdits=n})(ai||(ai={}));function ny(t,e){if(t.length<=1)return t;let r=t.length/2|0,n=t.slice(0,r),i=t.slice(r);ny(n,e),ny(i,e);let o=0,s=0,a=0;for(;o<n.length&&s<i.length;)e(n[o],i[s])<=0?t[a++]=n[o++]:t[a++]=i[s++];for(;o<n.length;)t[a++]=n[o++];for(;s<i.length;)t[a++]=i[s++];return t}function nE(t,e,r=0){let n=e?[r]:[];for(let i=0;i<t.length;i++){let o=t.charCodeAt(i);iE(o)&&(o===13&&i+1<t.length&&t.charCodeAt(i+1)===10&&i++,n.push(r+i+1))}return n}function iE(t){return t===13||t===10}function oE(t){let e=t.start,r=t.end;return e.line>r.line||e.line===r.line&&e.character>r.character?{start:r,end:e}:t}function UF(t){let e=oE(t.range);return e!==t.range?{newText:t.newText,range:e}:t}var sE;(()=>{"use strict";var t={470:i=>{function o(c){if(typeof c!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(c))}function s(c,u){for(var l,d="",f=0,m=-1,v=0,T=0;T<=c.length;++T){if(T<c.length)l=c.charCodeAt(T);else{if(l===47)break;l=47}if(l===47){if(!(m===T-1||v===1))if(m!==T-1&&v===2){if(d.length<2||f!==2||d.charCodeAt(d.length-1)!==46||d.charCodeAt(d.length-2)!==46){if(d.length>2){var C=d.lastIndexOf("/");if(C!==d.length-1){C===-1?(d="",f=0):f=(d=d.slice(0,C)).length-1-d.lastIndexOf("/"),m=T,v=0;continue}}else if(d.length===2||d.length===1){d="",f=0,m=T,v=0;continue}}u&&(d.length>0?d+="/..":d="..",f=2)}else d.length>0?d+="/"+c.slice(m+1,T):d=c.slice(m+1,T),f=T-m-1;m=T,v=0}else l===46&&v!==-1?++v:v=-1}return d}var a={resolve:function(){for(var c,u="",l=!1,d=arguments.length-1;d>=-1&&!l;d--){var f;d>=0?f=arguments[d]:(c===void 0&&(c=process.cwd()),f=c),o(f),f.length!==0&&(u=f+"/"+u,l=f.charCodeAt(0)===47)}return u=s(u,!l),l?u.length>0?"/"+u:"/":u.length>0?u:"."},normalize:function(c){if(o(c),c.length===0)return".";var u=c.charCodeAt(0)===47,l=c.charCodeAt(c.length-1)===47;return(c=s(c,!u)).length!==0||u||(c="."),c.length>0&&l&&(c+="/"),u?"/"+c:c},isAbsolute:function(c){return o(c),c.length>0&&c.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var c,u=0;u<arguments.length;++u){var l=arguments[u];o(l),l.length>0&&(c===void 0?c=l:c+="/"+l)}return c===void 0?".":a.normalize(c)},relative:function(c,u){if(o(c),o(u),c===u||(c=a.resolve(c))===(u=a.resolve(u)))return"";for(var l=1;l<c.length&&c.charCodeAt(l)===47;++l);for(var d=c.length,f=d-l,m=1;m<u.length&&u.charCodeAt(m)===47;++m);for(var v=u.length-m,T=f<v?f:v,C=-1,R=0;R<=T;++R){if(R===T){if(v>T){if(u.charCodeAt(m+R)===47)return u.slice(m+R+1);if(R===0)return u.slice(m+R)}else f>T&&(c.charCodeAt(l+R)===47?C=R:R===0&&(C=0));break}var g=c.charCodeAt(l+R);if(g!==u.charCodeAt(m+R))break;g===47&&(C=R)}var p="";for(R=l+C+1;R<=d;++R)R!==d&&c.charCodeAt(R)!==47||(p.length===0?p+="..":p+="/..");return p.length>0?p+u.slice(m+C):(m+=C,u.charCodeAt(m)===47&&++m,u.slice(m))},_makeLong:function(c){return c},dirname:function(c){if(o(c),c.length===0)return".";for(var u=c.charCodeAt(0),l=u===47,d=-1,f=!0,m=c.length-1;m>=1;--m)if((u=c.charCodeAt(m))===47){if(!f){d=m;break}}else f=!1;return d===-1?l?"/":".":l&&d===1?"//":c.slice(0,d)},basename:function(c,u){if(u!==void 0&&typeof u!="string")throw new TypeError('"ext" argument must be a string');o(c);var l,d=0,f=-1,m=!0;if(u!==void 0&&u.length>0&&u.length<=c.length){if(u.length===c.length&&u===c)return"";var v=u.length-1,T=-1;for(l=c.length-1;l>=0;--l){var C=c.charCodeAt(l);if(C===47){if(!m){d=l+1;break}}else T===-1&&(m=!1,T=l+1),v>=0&&(C===u.charCodeAt(v)?--v==-1&&(f=l):(v=-1,f=T))}return d===f?f=T:f===-1&&(f=c.length),c.slice(d,f)}for(l=c.length-1;l>=0;--l)if(c.charCodeAt(l)===47){if(!m){d=l+1;break}}else f===-1&&(m=!1,f=l+1);return f===-1?"":c.slice(d,f)},extname:function(c){o(c);for(var u=-1,l=0,d=-1,f=!0,m=0,v=c.length-1;v>=0;--v){var T=c.charCodeAt(v);if(T!==47)d===-1&&(f=!1,d=v+1),T===46?u===-1?u=v:m!==1&&(m=1):u!==-1&&(m=-1);else if(!f){l=v+1;break}}return u===-1||d===-1||m===0||m===1&&u===d-1&&u===l+1?"":c.slice(u,d)},format:function(c){if(c===null||typeof c!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof c);return function(u,l){var d=l.dir||l.root,f=l.base||(l.name||"")+(l.ext||"");return d?d===l.root?d+f:d+"/"+f:f}(0,c)},parse:function(c){o(c);var u={root:"",dir:"",base:"",ext:"",name:""};if(c.length===0)return u;var l,d=c.charCodeAt(0),f=d===47;f?(u.root="/",l=1):l=0;for(var m=-1,v=0,T=-1,C=!0,R=c.length-1,g=0;R>=l;--R)if((d=c.charCodeAt(R))!==47)T===-1&&(C=!1,T=R+1),d===46?m===-1?m=R:g!==1&&(g=1):m!==-1&&(g=-1);else if(!C){v=R+1;break}return m===-1||T===-1||g===0||g===1&&m===T-1&&m===v+1?T!==-1&&(u.base=u.name=v===0&&f?c.slice(1,T):c.slice(v,T)):(v===0&&f?(u.name=c.slice(1,m),u.base=c.slice(1,T)):(u.name=c.slice(v,m),u.base=c.slice(v,T)),u.ext=c.slice(m,T)),v>0?u.dir=c.slice(0,v-1):f&&(u.dir="/"),u},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,i.exports=a}},e={};function r(i){var o=e[i];if(o!==void 0)return o.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,r),s.exports}r.d=(i,o)=>{for(var s in o)r.o(o,s)&&!r.o(i,s)&&Object.defineProperty(i,s,{enumerable:!0,get:o[s]})},r.o=(i,o)=>Object.prototype.hasOwnProperty.call(i,o),r.r=i=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})};var n={};(()=>{let i;r.r(n),r.d(n,{URI:()=>f,Utils:()=>zt}),typeof process=="object"?i=process.platform==="win32":typeof navigator=="object"&&(i=navigator.userAgent.indexOf("Windows")>=0);let o=/^\w[\w\d+.-]*$/,s=/^\//,a=/^\/\//;function c(I,_){if(!I.scheme&&_)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${I.authority}", path: "${I.path}", query: "${I.query}", fragment: "${I.fragment}"}`);if(I.scheme&&!o.test(I.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(I.path){if(I.authority){if(!s.test(I.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(a.test(I.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let u="",l="/",d=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class f{static isUri(_){return _ instanceof f||!!_&&typeof _.authority=="string"&&typeof _.fragment=="string"&&typeof _.path=="string"&&typeof _.query=="string"&&typeof _.scheme=="string"&&typeof _.fsPath=="string"&&typeof _.with=="function"&&typeof _.toString=="function"}scheme;authority;path;query;fragment;constructor(_,j,M,oe,z,H=!1){typeof _=="object"?(this.scheme=_.scheme||u,this.authority=_.authority||u,this.path=_.path||u,this.query=_.query||u,this.fragment=_.fragment||u):(this.scheme=function(dt,L){return dt||L?dt:"file"}(_,H),this.authority=j||u,this.path=function(dt,L){switch(dt){case"https":case"http":case"file":L?L[0]!==l&&(L=l+L):L=l}return L}(this.scheme,M||u),this.query=oe||u,this.fragment=z||u,c(this,H))}get fsPath(){return g(this,!1)}with(_){if(!_)return this;let{scheme:j,authority:M,path:oe,query:z,fragment:H}=_;return j===void 0?j=this.scheme:j===null&&(j=u),M===void 0?M=this.authority:M===null&&(M=u),oe===void 0?oe=this.path:oe===null&&(oe=u),z===void 0?z=this.query:z===null&&(z=u),H===void 0?H=this.fragment:H===null&&(H=u),j===this.scheme&&M===this.authority&&oe===this.path&&z===this.query&&H===this.fragment?this:new v(j,M,oe,z,H)}static parse(_,j=!1){let M=d.exec(_);return M?new v(M[2]||u,Q(M[4]||u),Q(M[5]||u),Q(M[7]||u),Q(M[9]||u),j):new v(u,u,u,u,u)}static file(_){let j=u;if(i&&(_=_.replace(/\\/g,l)),_[0]===l&&_[1]===l){let M=_.indexOf(l,2);M===-1?(j=_.substring(2),_=l):(j=_.substring(2,M),_=_.substring(M)||l)}return new v("file",j,_,u,u)}static from(_){let j=new v(_.scheme,_.authority,_.path,_.query,_.fragment);return c(j,!0),j}toString(_=!1){return p(this,_)}toJSON(){return this}static revive(_){if(_){if(_ instanceof f)return _;{let j=new v(_);return j._formatted=_.external,j._fsPath=_._sep===m?_.fsPath:null,j}}return _}}let m=i?1:void 0;class v extends f{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=g(this,!1)),this._fsPath}toString(_=!1){return _?p(this,!0):(this._formatted||(this._formatted=p(this,!1)),this._formatted)}toJSON(){let _={$mid:1};return this._fsPath&&(_.fsPath=this._fsPath,_._sep=m),this._formatted&&(_.external=this._formatted),this.path&&(_.path=this.path),this.scheme&&(_.scheme=this.scheme),this.authority&&(_.authority=this.authority),this.query&&(_.query=this.query),this.fragment&&(_.fragment=this.fragment),_}}let T={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function C(I,_,j){let M,oe=-1;for(let z=0;z<I.length;z++){let H=I.charCodeAt(z);if(H>=97&&H<=122||H>=65&&H<=90||H>=48&&H<=57||H===45||H===46||H===95||H===126||_&&H===47||j&&H===91||j&&H===93||j&&H===58)oe!==-1&&(M+=encodeURIComponent(I.substring(oe,z)),oe=-1),M!==void 0&&(M+=I.charAt(z));else{M===void 0&&(M=I.substr(0,z));let dt=T[H];dt!==void 0?(oe!==-1&&(M+=encodeURIComponent(I.substring(oe,z)),oe=-1),M+=dt):oe===-1&&(oe=z)}}return oe!==-1&&(M+=encodeURIComponent(I.substring(oe))),M!==void 0?M:I}function R(I){let _;for(let j=0;j<I.length;j++){let M=I.charCodeAt(j);M===35||M===63?(_===void 0&&(_=I.substr(0,j)),_+=T[M]):_!==void 0&&(_+=I[j])}return _!==void 0?_:I}function g(I,_){let j;return j=I.authority&&I.path.length>1&&I.scheme==="file"?`//${I.authority}${I.path}`:I.path.charCodeAt(0)===47&&(I.path.charCodeAt(1)>=65&&I.path.charCodeAt(1)<=90||I.path.charCodeAt(1)>=97&&I.path.charCodeAt(1)<=122)&&I.path.charCodeAt(2)===58?_?I.path.substr(1):I.path[1].toLowerCase()+I.path.substr(2):I.path,i&&(j=j.replace(/\//g,"\\")),j}function p(I,_){let j=_?R:C,M="",{scheme:oe,authority:z,path:H,query:dt,fragment:L}=I;if(oe&&(M+=oe,M+=":"),(z||oe==="file")&&(M+=l,M+=l),z){let b=z.indexOf("@");if(b!==-1){let Te=z.substr(0,b);z=z.substr(b+1),b=Te.lastIndexOf(":"),b===-1?M+=j(Te,!1,!1):(M+=j(Te.substr(0,b),!1,!1),M+=":",M+=j(Te.substr(b+1),!1,!0)),M+="@"}z=z.toLowerCase(),b=z.lastIndexOf(":"),b===-1?M+=j(z,!1,!0):(M+=j(z.substr(0,b),!1,!0),M+=z.substr(b))}if(H){if(H.length>=3&&H.charCodeAt(0)===47&&H.charCodeAt(2)===58){let b=H.charCodeAt(1);b>=65&&b<=90&&(H=`/${String.fromCharCode(b+32)}:${H.substr(3)}`)}else if(H.length>=2&&H.charCodeAt(1)===58){let b=H.charCodeAt(0);b>=65&&b<=90&&(H=`${String.fromCharCode(b+32)}:${H.substr(2)}`)}M+=j(H,!0,!1)}return dt&&(M+="?",M+=j(dt,!1,!1)),L&&(M+="#",M+=_?L:C(L,!1,!1)),M}function S(I){try{return decodeURIComponent(I)}catch{return I.length>3?I.substr(0,3)+S(I.substr(3)):I}}let w=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function Q(I){return I.match(w)?I.replace(w,_=>S(_)):I}var Vt=r(470);let et=Vt.posix||Vt,dr="/";var zt;(function(I){I.joinPath=function(_,...j){return _.with({path:et.join(_.path,...j)})},I.resolvePath=function(_,...j){let M=_.path,oe=!1;M[0]!==dr&&(M=dr+M,oe=!0);let z=et.resolve(M,...j);return oe&&z[0]===dr&&!_.authority&&(z=z.substring(1)),_.with({path:z})},I.dirname=function(_){if(_.path.length===0||_.path===dr)return _;let j=et.dirname(_.path);return j.length===1&&j.charCodeAt(0)===46&&(j=""),_.with({path:j})},I.basename=function(_){return et.basename(_.path)},I.extname=function(_){return et.extname(_.path)}})(zt||(zt={}))})(),sE=n})();var{URI:Oe,Utils:aa}=sE;var re;(function(t){t.basename=aa.basename,t.dirname=aa.dirname,t.extname=aa.extname,t.joinPath=aa.joinPath,t.resolvePath=aa.resolvePath;let e=typeof process=="object"&&(process==null?void 0:process.platform)==="win32";function r(o,s){return o?.toString()===s?.toString()}t.equals=r;function n(o,s){let a=typeof o=="string"?Oe.parse(o).path:o.path,c=typeof s=="string"?Oe.parse(s).path:s.path,u=a.split("/").filter(v=>v.length>0),l=c.split("/").filter(v=>v.length>0);if(e){let v=/^[A-Z]:$/;if(u[0]&&v.test(u[0])&&(u[0]=u[0].toLowerCase()),l[0]&&v.test(l[0])&&(l[0]=l[0].toLowerCase()),u[0]!==l[0])return c.substring(1)}let d=0;for(;d<u.length&&u[d]===l[d];d++);let f="../".repeat(u.length-d),m=l.slice(d).join("/");return f+m}t.relative=n;function i(o){return Oe.parse(o.toString()).toString()}t.normalize=i})(re||(re={}));var B;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(B||(B={}));var Xc=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}async fromUri(e,r=G.CancellationToken.None){let n=await this.fileSystemProvider.readFile(e);return this.createAsync(e,n,r)}fromTextDocument(e,r,n){return r=r??Oe.parse(e.uri),G.CancellationToken.is(n)?this.createAsync(r,e,n):this.create(r,e,n)}fromString(e,r,n){return G.CancellationToken.is(n)?this.createAsync(r,e,n):this.create(r,e,n)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r,n){if(typeof r=="string"){let i=this.parse(e,r,n);return this.createLangiumDocument(i,e,void 0,r)}else if("$model"in r){let i={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(i,e)}else{let i=this.parse(e,r.getText(),n);return this.createLangiumDocument(i,e,r)}}async createAsync(e,r,n){if(typeof r=="string"){let i=await this.parseAsync(e,r,n);return this.createLangiumDocument(i,e,void 0,r)}else{let i=await this.parseAsync(e,r.getText(),n);return this.createLangiumDocument(i,e,r)}}createLangiumDocument(e,r,n,i){let o;if(n)o={parseResult:e,uri:r,state:B.Parsed,references:[],textDocument:n};else{let s=this.createTextDocumentGetter(r,i);o={parseResult:e,uri:r,state:B.Parsed,references:[],get textDocument(){return s()}}}return e.value.$document=o,o}async update(e,r){var n,i;let o=(n=e.parseResult.value.$cstNode)===null||n===void 0?void 0:n.root.fullText,s=(i=this.textDocuments)===null||i===void 0?void 0:i.get(e.uri.toString()),a=s?s.getText():await this.fileSystemProvider.readFile(e.uri);if(s)Object.defineProperty(e,"textDocument",{value:s});else{let c=this.createTextDocumentGetter(e.uri,a);Object.defineProperty(e,"textDocument",{get:c})}return o!==a&&(e.parseResult=await this.parseAsync(e.uri,a,r),e.parseResult.value.$document=e),e.state=B.Parsed,e}parse(e,r,n){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r,n)}parseAsync(e,r,n){return this.serviceRegistry.getServices(e).parser.AsyncParser.parse(r,n)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=ai.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}},Yc=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.serviceRegistry=e.ServiceRegistry}get all(){return ee(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getDocument(e){let r=e.toString();return this.documentMap.get(r)}async getOrCreateDocument(e,r){let n=this.getDocument(e);return n||(n=await this.langiumDocumentFactory.fromUri(e,r),this.addDocument(n),n)}createDocument(e,r,n){if(n)return this.langiumDocumentFactory.fromString(r,e,n).then(i=>(this.addDocument(i),i));{let i=this.langiumDocumentFactory.fromString(r,e);return this.addDocument(i),i}}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(this.serviceRegistry.getServices(e).references.Linker.unlink(n),n.state=B.Changed,n.precomputedScopes=void 0,n.diagnostics=void 0),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=B.Changed,this.documentMap.delete(r)),n}};var iy=Symbol("ref_resolving"),Jc=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=G.CancellationToken.None){for(let n of Sr(e.parseResult.value))await Ve(r),as(n).forEach(i=>this.doLink(i,e))}doLink(e,r){var n;let i=e.reference;if(i._ref===void 0){i._ref=iy;try{let o=this.getCandidate(e);if(Ei(o))i._ref=o;else if(i._nodeDescription=o,this.langiumDocuments().hasDocument(o.documentUri)){let s=this.loadAstNode(o);i._ref=s??this.createLinkingError(e,o)}else i._ref=void 0}catch(o){console.error(`An error occurred while resolving reference to '${i.$refText}':`,o);let s=(n=o.message)!==null&&n!==void 0?n:String(o);i._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${i.$refText}': ${s}`})}r.references.push(i)}}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let o=this,s={$refNode:n,$refText:i,get ref(){var a;if(Pe(this._ref))return this._ref;if(mm(this._nodeDescription)){let c=o.loadAstNode(this._nodeDescription);this._ref=c??o.createLinkingError({reference:s,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){this._ref=iy;let c=Qa(e).$document,u=o.getLinkedNode({reference:s,container:e,property:r});if(u.error&&c&&c.state<B.ComputedScopes)return this._ref=void 0;this._ref=(a=u.node)!==null&&a!==void 0?a:u.error,this._nodeDescription=u.descr,c?.references.push(this)}else if(this._ref===iy)throw new Error(`Cyclic reference resolution detected: ${o.astNodeLocator.getAstNodePath(e)}/${r} (symbol '${i}')`);return Pe(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return Ei(this._ref)?this._ref:void 0}};return s}getLinkedNode(e){var r;try{let n=this.getCandidate(e);if(Ei(n))return{error:n};let i=this.loadAstNode(n);return i?{node:i,descr:n}:{descr:n,error:this.createLinkingError(e,n)}}catch(n){console.error(`An error occurred while resolving reference to '${e.reference.$refText}':`,n);let i=(r=n.message)!==null&&r!==void 0?r:String(n);return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${i}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getDocument(e.documentUri);if(r)return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=Qa(e.container).$document;n&&n.state<B.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};function Yd(t){return typeof t.name=="string"}var Qc=class{getName(e){if(Yd(e))return e.name}getNameNode(e){return ac(e.$cstNode,"name")}};var Zc=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=Qm(e),n=e.astNode;if(r&&n){let i=n[r.feature];if(Et(i))return i.ref;if(Array.isArray(i)){for(let o of i)if(Et(o)&&o.$refNode&&o.$refNode.offset<=e.offset&&o.$refNode.end>=e.end)return o.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||ym(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){let n=[];if(r.includeDeclaration){let o=this.getReferenceToSelf(e);o&&n.push(o)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return r.documentUri&&(i=i.filter(o=>re.equals(o.sourceUri,r.documentUri))),n.push(...i),ee(n)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=ot(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:_i(r),local:!0}}}};var Ur=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return vo.sum(ee(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return ee(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return ee(this.map.keys())}values(){return ee(this.map.values()).flat()}entriesGroupedByKey(){return ee(this.map.entries())}},eo=class{get size(){return this.map.size}constructor(e){if(this.map=new Map,this.inverse=new Map,e)for(let[r,n]of e)this.set(r,n)}clear(){this.map.clear(),this.inverse.clear()}set(e,r){return this.map.set(e,r),this.inverse.set(r,e),this}get(e){return this.map.get(e)}getKey(e){return this.inverse.get(e)}delete(e){let r=this.map.get(e);return r!==void 0?(this.map.delete(e),this.inverse.delete(r),!0):!1}};var to=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=G.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=Ni,i=G.CancellationToken.None){let o=[];this.exportNode(e,o,r);for(let s of n(e))await Ve(i),this.exportNode(s,o,r);return o}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=G.CancellationToken.None){let n=e.parseResult.value,i=new Ur;for(let o of hr(n))await Ve(r),this.processNode(o,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let o=this.nameProvider.getName(e);o&&n.add(i,this.descriptions.createDescription(e,o,r))}}};var ca=class{constructor(e,r,n){var i;this.elements=e,this.outerScope=r,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}},eu=class{constructor(e,r,n){var i;this.elements=new Map,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1;for(let o of e){let s=this.caseInsensitive?o.name.toLowerCase():o.name;this.elements.set(s,o)}this.outerScope=r}getElement(e){let r=this.caseInsensitive?e.toLowerCase():e,n=this.elements.get(r);if(n)return n;if(this.outerScope)return this.outerScope.getElement(e)}getAllElements(){let e=ee(this.elements.values());return this.outerScope&&(e=e.concat(this.outerScope.getAllElements())),e}},BF={getElement(){},getAllElements(){return Ua}};var ua=class{constructor(){this.toDispose=[],this.isDisposed=!1}onDispose(e){this.toDispose.push(e)}dispose(){this.throwIfDisposed(),this.clear(),this.isDisposed=!0,this.toDispose.forEach(e=>e.dispose())}throwIfDisposed(){if(this.isDisposed)throw new Error("This cache has already been disposed")}},tu=class extends ua{constructor(){super(...arguments),this.cache=new Map}has(e){return this.throwIfDisposed(),this.cache.has(e)}set(e,r){this.throwIfDisposed(),this.cache.set(e,r)}get(e,r){if(this.throwIfDisposed(),this.cache.has(e))return this.cache.get(e);if(r){let n=r();return this.cache.set(e,n),n}else return}delete(e){return this.throwIfDisposed(),this.cache.delete(e)}clear(){this.throwIfDisposed(),this.cache.clear()}},ro=class extends ua{constructor(e){super(),this.cache=new Map,this.converter=e??(r=>r)}has(e,r){return this.throwIfDisposed(),this.cacheForContext(e).has(r)}set(e,r,n){this.throwIfDisposed(),this.cacheForContext(e).set(r,n)}get(e,r,n){this.throwIfDisposed();let i=this.cacheForContext(e);if(i.has(r))return i.get(r);if(n){let o=n();return i.set(r,o),o}else return}delete(e,r){return this.throwIfDisposed(),this.cacheForContext(e).delete(r)}clear(e){if(this.throwIfDisposed(),e){let r=this.converter(e);this.cache.delete(r)}else this.cache.clear()}cacheForContext(e){let r=this.converter(e),n=this.cache.get(r);return n||(n=new Map,this.cache.set(r,n)),n}},Jd=class extends ro{constructor(e,r){super(n=>n.toString()),r?(this.toDispose.push(e.workspace.DocumentBuilder.onDocumentPhase(r,n=>{this.clear(n.uri.toString())})),this.toDispose.push(e.workspace.DocumentBuilder.onUpdate((n,i)=>{for(let o of i)this.clear(o)}))):this.toDispose.push(e.workspace.DocumentBuilder.onUpdate((n,i)=>{let o=n.concat(i);for(let s of o)this.clear(s)}))}},la=class extends tu{constructor(e,r){super(),r?(this.toDispose.push(e.workspace.DocumentBuilder.onBuildPhase(r,()=>{this.clear()})),this.toDispose.push(e.workspace.DocumentBuilder.onUpdate((n,i)=>{i.length>0&&this.clear()}))):this.toDispose.push(e.workspace.DocumentBuilder.onUpdate(()=>{this.clear()}))}};var no=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager,this.globalScopeCache=new la(e.shared)}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=ot(e.container).precomputedScopes;if(i){let s=e.container;do{let a=i.get(s);a.length>0&&r.push(ee(a).filter(c=>this.reflection.isSubtype(c.type,n))),s=s.$container}while(s)}let o=this.getGlobalScope(n,e);for(let s=r.length-1;s>=0;s--)o=this.createScope(r[s],o);return o}createScope(e,r,n){return new ca(ee(e),r,n)}createScopeForNodes(e,r,n){let i=ee(e).map(o=>{let s=this.nameProvider.getName(o);if(s)return this.descriptions.createDescription(o,s)}).nonNullable();return new ca(i,r,n)}getGlobalScope(e,r){return this.globalScopeCache.get(e,()=>new eu(this.indexManager.allElements(e)))}};function nu(t){return typeof t.$comment=="string"}function aE(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var ru=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.langiumDocuments=e.shared.workspace.LangiumDocuments,this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider,this.commentProvider=e.documentation.CommentProvider}serialize(e,r){let n=r??{},i=r?.replacer,o=(a,c)=>this.replacer(a,c,n),s=i?(a,c)=>i(a,c,o):o;try{return this.currentDocument=ot(e),JSON.stringify(e,s,r?.space)}finally{this.currentDocument=void 0}}deserialize(e,r){let n=r??{},i=JSON.parse(e);return this.linkNode(i,i,n),i}replacer(e,r,{refText:n,sourceText:i,textRegions:o,comments:s,uriConverter:a}){var c,u,l,d;if(!this.ignoreProperties.has(e))if(Et(r)){let f=r.ref,m=n?r.$refText:void 0;if(f){let v=ot(f),T="";this.currentDocument&&this.currentDocument!==v&&(a?T=a(v.uri,r):T=v.uri.toString());let C=this.astNodeLocator.getAstNodePath(f);return{$ref:`${T}#${C}`,$refText:m}}else return{$error:(u=(c=r.error)===null||c===void 0?void 0:c.message)!==null&&u!==void 0?u:"Could not resolve reference",$refText:m}}else if(Pe(r)){let f;if(o&&(f=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&f?.$textRegion&&(f.$textRegion.documentURI=(l=this.currentDocument)===null||l===void 0?void 0:l.uri.toString())),i&&!e&&(f??(f=Object.assign({},r)),f.$sourceText=(d=r.$cstNode)===null||d===void 0?void 0:d.text),s){f??(f=Object.assign({},r));let m=this.commentProvider.getComment(r);m&&(f.$comment=m.replace(/\r/g,""))}return f??r}else return r}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(o=>!o.startsWith("$")).forEach(o=>{let s=zm(e.$cstNode,o).map(r);s.length!==0&&(i[o]=s)}),e}}linkNode(e,r,n,i,o,s){for(let[c,u]of Object.entries(e))if(Array.isArray(u))for(let l=0;l<u.length;l++){let d=u[l];aE(d)?u[l]=this.reviveReference(e,c,r,d,n):Pe(d)&&this.linkNode(d,r,n,e,c,l)}else aE(u)?e[c]=this.reviveReference(e,c,r,u,n):Pe(u)&&this.linkNode(u,r,n,e,c);let a=e;a.$container=i,a.$containerProperty=o,a.$containerIndex=s}reviveReference(e,r,n,i,o){let s=i.$refText,a=i.$error;if(i.$ref){let c=this.getRefNode(n,i.$ref,o.uriConverter);if(Pe(c))return s||(s=this.nameProvider.getName(c)),{$refText:s??"",ref:c};a=c}if(a){let c={$refText:s??""};return c.error={container:e,property:r,message:a,reference:c},c}else return}getRefNode(e,r,n){try{let i=r.indexOf("#");if(i===0){let c=this.astNodeLocator.getAstNode(e,r.substring(1));return c||"Could not resolve path: "+r}if(i<0){let c=n?n(r):Oe.parse(r),u=this.langiumDocuments.getDocument(c);return u?u.parseResult.value:"Could not find document for URI: "+r}let o=n?n(r.substring(0,i)):Oe.parse(r.substring(0,i)),s=this.langiumDocuments.getDocument(o);if(!s)return"Could not find document for URI: "+r;if(i===r.length-1)return s.parseResult.value;let a=this.astNodeLocator.getAstNode(s.parseResult.value,r.substring(i+1));return a||"Could not resolve URI: "+r}catch(i){return String(i)}}};var iu=class{get map(){return this.fileExtensionMap}constructor(e){this.languageIdMap=new Map,this.fileExtensionMap=new Map,this.fileNameMap=new Map,this.textDocuments=e?.workspace.TextDocuments}register(e){let r=e.LanguageMetaData;for(let n of r.fileExtensions)this.fileExtensionMap.has(n)&&console.warn(`The file extension ${n} is used by multiple languages. It is now assigned to '${r.languageId}'.`),this.fileExtensionMap.set(n,e);if(r.fileNames)for(let n of r.fileNames)this.fileNameMap.has(n)&&console.warn(`The file name ${n} is used by multiple languages. It is now assigned to '${r.languageId}'.`),this.fileNameMap.set(n,e);this.languageIdMap.set(r.languageId,e),this.languageIdMap.size===1?this.singleton=e:this.singleton=void 0}getServices(e){var r,n,i;if(this.singleton!==void 0)return this.singleton;if(this.languageIdMap.size===0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let o=(n=(r=this.textDocuments)===null||r===void 0?void 0:r.get(e))===null||n===void 0?void 0:n.languageId;if(o!==void 0){let u=this.languageIdMap.get(o);if(u)return u}let s=re.extname(e),a=re.basename(e),c=(i=this.fileNameMap.get(a))!==null&&i!==void 0?i:this.fileExtensionMap.get(s);if(!c)throw o?new Error(`The service registry contains no services for the extension '${s}' for language '${o}'.`):new Error(`The service registry contains no services for the extension '${s}'.`);return c}hasServices(e){try{return this.getServices(e),!0}catch{return!1}}get all(){return Array.from(this.languageIdMap.values())}};function io(t){return{code:t}}var da;(function(t){t.all=["fast","slow","built-in"]})(da||(da={}));var ou=class{constructor(e){this.entries=new Ur,this.entriesBefore=[],this.entriesAfter=[],this.reflection=e.shared.AstReflection}register(e,r=this,n="fast"){if(n==="built-in")throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");for(let[i,o]of Object.entries(e)){let s=o;if(Array.isArray(s))for(let a of s){let c={check:this.wrapValidationException(a,r),category:n};this.addEntry(i,c)}else if(typeof s=="function"){let a={check:this.wrapValidationException(s,r),category:n};this.addEntry(i,a)}else Vr(s)}}wrapValidationException(e,r){return async(n,i,o)=>{await this.handleException(()=>e.call(r,n,i,o),"An error occurred during validation",i,n)}}async handleException(e,r,n,i){try{await e()}catch(o){if(_r(o))throw o;console.error(`${r}:`,o),o instanceof Error&&o.stack&&console.error(o.stack);let s=o instanceof Error?o.message:String(o);n("error",`${r}: ${s}`,{node:i})}}addEntry(e,r){if(e==="AstNode"){this.entries.add("AstNode",r);return}for(let n of this.reflection.getAllSubTypes(e))this.entries.add(n,r)}getChecks(e,r){let n=ee(this.entries.get(e)).concat(this.entries.get("AstNode"));return r&&(n=n.filter(i=>r.includes(i.category))),n.map(i=>i.check)}registerBeforeDocument(e,r=this){this.entriesBefore.push(this.wrapPreparationException(e,"An error occurred during set-up of the validation",r))}registerAfterDocument(e,r=this){this.entriesAfter.push(this.wrapPreparationException(e,"An error occurred during tear-down of the validation",r))}wrapPreparationException(e,r,n){return async(i,o,s,a)=>{await this.handleException(()=>e.call(n,i,o,s,a),r,o,i)}}get checksBefore(){return this.entriesBefore}get checksAfter(){return this.entriesAfter}};var su=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r={},n=G.CancellationToken.None){let i=e.parseResult,o=[];if(await Ve(n),(!r.categories||r.categories.includes("built-in"))&&(this.processLexingErrors(i,o,r),r.stopAfterLexingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===Ar.LexingError})||(this.processParsingErrors(i,o,r),r.stopAfterParsingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===Ar.ParsingError}))||(this.processLinkingErrors(e,o,r),r.stopAfterLinkingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===Ar.LinkingError}))))return o;try{o.push(...await this.validateAst(i.value,r,n))}catch(s){if(_r(s))throw s;console.error("An error occurred during validation:",s)}return await Ve(n),o}processLexingErrors(e,r,n){var i,o,s;let a=[...e.lexerErrors,...(o=(i=e.lexerReport)===null||i===void 0?void 0:i.diagnostics)!==null&&o!==void 0?o:[]];for(let c of a){let u=(s=c.severity)!==null&&s!==void 0?s:"error",l={severity:Qd(u),range:{start:{line:c.line-1,character:c.column-1},end:{line:c.line-1,character:c.column+c.length-1}},message:c.message,data:uE(u),source:this.getSource()};r.push(l)}}processParsingErrors(e,r,n){for(let i of e.parserErrors){let o;if(isNaN(i.token.startOffset)){if("previousToken"in i){let s=i.previousToken;if(isNaN(s.startOffset)){let a={line:0,character:0};o={start:a,end:a}}else{let a={line:s.endLine-1,character:s.endColumn};o={start:a,end:a}}}}else o=xo(i.token);if(o){let s={severity:Qd("error"),range:o,message:i.message,data:io(Ar.ParsingError),source:this.getSource()};r.push(s)}}}processLinkingErrors(e,r,n){for(let i of e.references){let o=i.error;if(o){let s={node:o.container,property:o.property,index:o.index,data:{code:Ar.LinkingError,containerType:o.container.$type,property:o.property,refText:o.reference.$refText}};r.push(this.toDiagnostic("error",o.message,s))}}}async validateAst(e,r,n=G.CancellationToken.None){let i=[],o=(s,a,c)=>{i.push(this.toDiagnostic(s,a,c))};return await this.validateAstBefore(e,r,o,n),await this.validateAstNodes(e,r,o,n),await this.validateAstAfter(e,r,o,n),i}async validateAstBefore(e,r,n,i=G.CancellationToken.None){var o;let s=this.validationRegistry.checksBefore;for(let a of s)await Ve(i),await a(e,n,(o=r.categories)!==null&&o!==void 0?o:[],i)}async validateAstNodes(e,r,n,i=G.CancellationToken.None){await Promise.all(Sr(e).map(async o=>{await Ve(i);let s=this.validationRegistry.getChecks(o.$type,r.categories);for(let a of s)await a(o,n,i)}))}async validateAstAfter(e,r,n,i=G.CancellationToken.None){var o;let s=this.validationRegistry.checksAfter;for(let a of s)await Ve(i),await a(e,n,(o=r.categories)!==null&&o!==void 0?o:[],i)}toDiagnostic(e,r,n){return{message:r,range:cE(n),severity:Qd(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};function cE(t){if(t.range)return t.range;let e;return typeof t.property=="string"?e=ac(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=Ym(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}function Qd(t){switch(t){case"error":return 1;case"warning":return 2;case"info":return 3;case"hint":return 4;default:throw new Error("Invalid diagnostic severity: "+t)}}function uE(t){switch(t){case"error":return io(Ar.LexingError);case"warning":return io(Ar.LexingWarning);case"info":return io(Ar.LexingInfo);case"hint":return io(Ar.LexingHint);default:throw new Error("Invalid diagnostic severity: "+t)}}var Ar;(function(t){t.LexingError="lexing-error",t.LexingWarning="lexing-warning",t.LexingInfo="lexing-info",t.LexingHint="lexing-hint",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(Ar||(Ar={}));var au=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n){let i=n??ot(e);r??(r=this.nameProvider.getName(e));let o=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${o} has no name.`);let s,a=()=>{var c;return s??(s=_i((c=this.nameProvider.getNameNode(e))!==null&&c!==void 0?c:e.$cstNode))};return{node:e,name:r,get nameSegment(){return a()},selectionSegment:_i(e.$cstNode),type:e.$type,documentUri:i.uri,path:o}}},cu=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=G.CancellationToken.None){let n=[],i=e.parseResult.value;for(let o of Sr(i))await Ve(r),as(o).filter(s=>!Ei(s)).forEach(s=>{let a=this.createDescription(s);a&&n.push(a)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=ot(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:_i(n),local:re.equals(r.documentUri,i)}}};var uu=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,o)=>{if(!i||o.length===0)return i;let s=o.indexOf(this.indexSeparator);if(s>0){let a=o.substring(0,s),c=parseInt(o.substring(s+1)),u=i[a];return u?.[c]}return i[o]},e)}};var Ie={};ae(Ie,Jt(Zi(),1));var lu=class{constructor(e){this._ready=new Kt,this.settings={},this.workspaceConfig=!1,this.onConfigurationSectionUpdateEmitter=new Ie.Emitter,this.serviceRegistry=e.ServiceRegistry}get ready(){return this._ready.promise}initialize(e){var r,n;this.workspaceConfig=(n=(r=e.capabilities.workspace)===null||r===void 0?void 0:r.configuration)!==null&&n!==void 0?n:!1}async initialized(e){if(this.workspaceConfig){if(e.register){let r=this.serviceRegistry.all;e.register({section:r.map(n=>this.toSectionName(n.LanguageMetaData.languageId))})}if(e.fetchConfiguration){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await e.fetchConfiguration(r);r.forEach((i,o)=>{this.updateSectionConfiguration(i.section,n[o])})}}this._ready.resolve()}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{let n=e.settings[r];this.updateSectionConfiguration(r,n),this.onConfigurationSectionUpdateEmitter.fire({section:r,configuration:n})})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){await this.ready;let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}get onConfigurationSectionUpdate(){return this.onConfigurationSectionUpdateEmitter.event}};var ci;(function(t){function e(r){return{dispose:async()=>await r()}}t.create=e})(ci||(ci={}));var du=class{constructor(e){this.updateBuildOptions={validation:{categories:["built-in","fast"]}},this.updateListeners=[],this.buildPhaseListeners=new Ur,this.documentPhaseListeners=new Ur,this.buildState=new Map,this.documentBuildWaiters=new Map,this.currentState=B.Changed,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.textDocuments=e.workspace.TextDocuments,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=G.CancellationToken.None){var i,o;for(let s of e){let a=s.uri.toString();if(s.state===B.Validated){if(typeof r.validation=="boolean"&&r.validation)s.state=B.IndexedReferences,s.diagnostics=void 0,this.buildState.delete(a);else if(typeof r.validation=="object"){let c=this.buildState.get(a),u=(i=c?.result)===null||i===void 0?void 0:i.validationChecks;if(u){let d=((o=r.validation.categories)!==null&&o!==void 0?o:da.all).filter(f=>!u.includes(f));d.length>0&&(this.buildState.set(a,{completed:!1,options:{validation:Object.assign(Object.assign({},r.validation),{categories:d})},result:c.result}),s.state=B.IndexedReferences)}}}else this.buildState.delete(a)}this.currentState=B.Changed,await this.emitUpdate(e.map(s=>s.uri),[]),await this.buildDocuments(e,r,n)}async update(e,r,n=G.CancellationToken.None){this.currentState=B.Changed;for(let s of r)this.langiumDocuments.deleteDocument(s),this.buildState.delete(s.toString()),this.indexManager.remove(s);for(let s of e){if(!this.langiumDocuments.invalidateDocument(s)){let c=this.langiumDocumentFactory.fromModel({$type:"INVALID"},s);c.state=B.Changed,this.langiumDocuments.addDocument(c)}this.buildState.delete(s.toString())}let i=ee(e).concat(r).map(s=>s.toString()).toSet();this.langiumDocuments.all.filter(s=>!i.has(s.uri.toString())&&this.shouldRelink(s,i)).forEach(s=>{this.serviceRegistry.getServices(s.uri).references.Linker.unlink(s),s.state=Math.min(s.state,B.ComputedScopes),s.diagnostics=void 0}),await this.emitUpdate(e,r),await Ve(n);let o=this.sortDocuments(this.langiumDocuments.all.filter(s=>{var a;return s.state<B.Linked||!(!((a=this.buildState.get(s.uri.toString()))===null||a===void 0)&&a.completed)}).toArray());await this.buildDocuments(o,this.updateBuildOptions,n)}async emitUpdate(e,r){await Promise.all(this.updateListeners.map(n=>n(e,r)))}sortDocuments(e){let r=0,n=e.length-1;for(;r<n;){for(;r<e.length&&this.hasTextDocument(e[r]);)r++;for(;n>=0&&!this.hasTextDocument(e[n]);)n--;r<n&&([e[r],e[n]]=[e[n],e[r]])}return e}hasTextDocument(e){var r;return!!(!((r=this.textDocuments)===null||r===void 0)&&r.get(e.uri))}shouldRelink(e,r){return e.references.some(n=>n.error!==void 0)?!0:this.indexManager.isAffected(e,r)}onUpdate(e){return this.updateListeners.push(e),ci.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}async buildDocuments(e,r,n){this.prepareBuild(e,r),await this.runCancelable(e,B.Parsed,n,s=>this.langiumDocumentFactory.update(s,n)),await this.runCancelable(e,B.IndexedContent,n,s=>this.indexManager.updateContent(s,n)),await this.runCancelable(e,B.ComputedScopes,n,async s=>{let a=this.serviceRegistry.getServices(s.uri).references.ScopeComputation;s.precomputedScopes=await a.computeLocalScopes(s,n)});let i=e.filter(s=>this.shouldLink(s));await this.runCancelable(i,B.Linked,n,s=>this.serviceRegistry.getServices(s.uri).references.Linker.link(s,n)),await this.runCancelable(i,B.IndexedReferences,n,s=>this.indexManager.updateReferences(s,n));let o=e.filter(s=>this.shouldValidate(s));await this.runCancelable(o,B.Validated,n,s=>this.validate(s,n));for(let s of e){let a=this.buildState.get(s.uri.toString());a&&(a.completed=!0)}}prepareBuild(e,r){for(let n of e){let i=n.uri.toString(),o=this.buildState.get(i);(!o||o.completed)&&this.buildState.set(i,{completed:!1,options:r,result:o?.result})}}async runCancelable(e,r,n,i){let o=e.filter(a=>a.state<r);for(let a of o)await Ve(n),await i(a),a.state=r,await this.notifyDocumentPhase(a,r,n);let s=e.filter(a=>a.state===r);await this.notifyBuildPhase(s,r,n),this.currentState=r}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),ci.create(()=>{this.buildPhaseListeners.delete(e,r)})}onDocumentPhase(e,r){return this.documentPhaseListeners.add(e,r),ci.create(()=>{this.documentPhaseListeners.delete(e,r)})}waitUntil(e,r,n){let i;if(r&&"path"in r?i=r:n=r,n??(n=G.CancellationToken.None),i){let o=this.langiumDocuments.getDocument(i);if(o&&o.state>=e)return Promise.resolve(i)}return this.currentState>=e?Promise.resolve(void 0):n.isCancellationRequested?Promise.reject(ln):new Promise((o,s)=>{let a=this.onBuildPhase(e,()=>{if(a.dispose(),c.dispose(),i){let u=this.langiumDocuments.getDocument(i);o(u?.uri)}else o(void 0)}),c=n.onCancellationRequested(()=>{a.dispose(),c.dispose(),s(ln)})})}async notifyDocumentPhase(e,r,n){let o=this.documentPhaseListeners.get(r).slice();for(let s of o)try{await s(e,n)}catch(a){if(!_r(a))throw a}}async notifyBuildPhase(e,r,n){if(e.length===0)return;let o=this.buildPhaseListeners.get(r).slice();for(let s of o)await Ve(n),await s(e,n)}shouldLink(e){var r;return(r=this.getBuildOptions(e).eagerLinking)!==null&&r!==void 0?r:!0}shouldValidate(e){return!!this.getBuildOptions(e).validation}async validate(e,r){var n,i;let o=this.serviceRegistry.getServices(e.uri).validation.DocumentValidator,s=this.getBuildOptions(e).validation,a=typeof s=="object"?s:void 0,c=await o.validateDocument(e,a,r);e.diagnostics?e.diagnostics.push(...c):e.diagnostics=c;let u=this.buildState.get(e.uri.toString());if(u){(n=u.result)!==null&&n!==void 0||(u.result={});let l=(i=a?.categories)!==null&&i!==void 0?i:da.all;u.result.validationChecks?u.result.validationChecks.push(...l):u.result.validationChecks=[...l]}}getBuildOptions(e){var r,n;return(n=(r=this.buildState.get(e.uri.toString()))===null||r===void 0?void 0:r.options)!==null&&n!==void 0?n:{}}};var fu=class{constructor(e){this.symbolIndex=new Map,this.symbolByTypeIndex=new ro,this.referenceIndex=new Map,this.documents=e.workspace.LangiumDocuments,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection}findAllReferences(e,r){let n=ot(e).uri,i=[];return this.referenceIndex.forEach(o=>{o.forEach(s=>{re.equals(s.targetUri,n)&&s.targetPath===r&&i.push(s)})}),ee(i)}allElements(e,r){let n=ee(this.symbolIndex.keys());return r&&(n=n.filter(i=>!r||r.has(i))),n.map(i=>this.getFileDescriptions(i,e)).flat()}getFileDescriptions(e,r){var n;return r?this.symbolByTypeIndex.get(e,r,()=>{var o;return((o=this.symbolIndex.get(e))!==null&&o!==void 0?o:[]).filter(a=>this.astReflection.isSubtype(a.type,r))}):(n=this.symbolIndex.get(e))!==null&&n!==void 0?n:[]}remove(e){let r=e.toString();this.symbolIndex.delete(r),this.symbolByTypeIndex.clear(r),this.referenceIndex.delete(r)}async updateContent(e,r=G.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r),o=e.uri.toString();this.symbolIndex.set(o,i),this.symbolByTypeIndex.clear(o)}async updateReferences(e,r=G.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i)}isAffected(e,r){let n=this.referenceIndex.get(e.uri.toString());return n?n.some(i=>!i.local&&r.has(i.targetUri.toString())):!1}};var pu=class{constructor(e){this.initialBuildOptions={},this._ready=new Kt,this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.WorkspaceLock}get ready(){return this._ready.promise}get workspaceFolders(){return this.folders}initialize(e){var r;this.folders=(r=e.workspaceFolders)!==null&&r!==void 0?r:void 0}initialized(e){return this.mutex.write(r=>{var n;return this.initializeWorkspace((n=this.folders)!==null&&n!==void 0?n:[],r)})}async initializeWorkspace(e,r=G.CancellationToken.None){let n=await this.performStartup(e);await Ve(r),await this.documentBuilder.build(n,this.initialBuildOptions,r)}async performStartup(e){let r=this.serviceRegistry.all.flatMap(s=>s.LanguageMetaData.fileExtensions),n=this.serviceRegistry.all.flatMap(s=>{var a;return(a=s.LanguageMetaData.fileNames)!==null&&a!==void 0?a:[]}),i=[],o=s=>{i.push(s),this.langiumDocuments.hasDocument(s.uri)||this.langiumDocuments.addDocument(s)};return await this.loadAdditionalDocuments(e,o),await Promise.all(e.map(s=>[s,this.getRootFolder(s)]).map(async s=>this.traverseFolder(...s,{fileExtensions:r,fileNames:n},o))),this._ready.resolve(),i}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return Oe.parse(e.uri)}async traverseFolder(e,r,n,i){let o=await this.fileSystemProvider.readDirectory(r);await Promise.all(o.map(async s=>{if(this.includeEntry(e,s,n)){if(s.isDirectory)await this.traverseFolder(e,s.uri,n,i);else if(s.isFile){let a=await this.langiumDocuments.getOrCreateDocument(s.uri);i(a)}}}))}includeEntry(e,r,n){let i=re.basename(r.uri);return i.startsWith(".")?!1:r.isDirectory?i!=="node_modules"&&i!=="out":r.isFile?n.fileExtensions.includes(re.extname(r.uri))||n.fileNames.includes(re.basename(r.uri)):!1}};var mu=class{buildUnexpectedCharactersMessage(e,r,n,i,o){return qs.buildUnexpectedCharactersMessage(e,r,n,i,o)}buildUnableToPopLexerModeMessage(e){return qs.buildUnableToPopLexerModeMessage(e)}},Zd={mode:"full"},oo=class{constructor(e){this.errorMessageProvider=e.parser.LexerErrorMessageProvider,this.tokenBuilder=e.parser.TokenBuilder;let r=this.tokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=oy(r)?Object.values(r):r,i=e.LanguageMetaData.mode==="production";this.chevrotainLexer=new Fe(n,{positionTracking:"full",skipValidations:i,errorMessageProvider:this.errorMessageProvider})}get definition(){return this.tokenTypes}tokenize(e,r=Zd){var n,i,o;let s=this.chevrotainLexer.tokenize(e);return{tokens:s.tokens,errors:s.errors,hidden:(n=s.groups.hidden)!==null&&n!==void 0?n:[],report:(o=(i=this.tokenBuilder).flushLexingReport)===null||o===void 0?void 0:o.call(i,e)}}toTokenTypeDictionary(e){if(oy(e))return e;let r=sy(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};function ef(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}function sy(t){return t&&"modes"in t&&"defaultMode"in t}function oy(t){return!ef(t)&&!sy(t)}zi();function yu(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=ue.create(0,0));let o=fE(t),s=uy(n),a=GF({lines:o,position:i,options:s});return XF({index:0,tokens:a,position:i})}function vu(t,e){let r=uy(e),n=fE(t);if(n.length===0)return!1;let i=n[0],o=n[n.length-1],s=r.start,a=r.end;return!!s?.exec(i)&&!!a?.exec(o)}function fE(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(Bm)}var lE=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,WF=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function GF(t){var e,r,n;let i=[],o=t.position.line,s=t.position.character;for(let a=0;a<t.lines.length;a++){let c=a===0,u=a===t.lines.length-1,l=t.lines[a],d=0;if(c&&t.options.start){let m=(e=t.options.start)===null||e===void 0?void 0:e.exec(l);m&&(d=m.index+m[0].length)}else{let m=(r=t.options.line)===null||r===void 0?void 0:r.exec(l);m&&(d=m.index+m[0].length)}if(u){let m=(n=t.options.end)===null||n===void 0?void 0:n.exec(l);m&&(l=l.substring(0,m.index))}if(l=l.substring(0,zF(l)),cy(l,d)>=l.length){if(i.length>0){let m=ue.create(o,s);i.push({type:"break",content:"",range:ne.create(m,m)})}}else{lE.lastIndex=d;let m=lE.exec(l);if(m){let v=m[0],T=m[1],C=ue.create(o,s+d),R=ue.create(o,s+d+v.length);i.push({type:"tag",content:T,range:ne.create(C,R)}),d+=v.length,d=cy(l,d)}if(d<l.length){let v=l.substring(d),T=Array.from(v.matchAll(WF));i.push(...HF(T,v,o,s+d))}}o++,s=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function HF(t,e,r,n){let i=[];if(t.length===0){let o=ue.create(r,n),s=ue.create(r,n+e.length);i.push({type:"text",content:e,range:ne.create(o,s)})}else{let o=0;for(let a of t){let c=a.index,u=e.substring(o,c);u.length>0&&i.push({type:"text",content:e.substring(o,c),range:ne.create(ue.create(r,o+n),ue.create(r,c+n))});let l=u.length+1,d=a[1];if(i.push({type:"inline-tag",content:d,range:ne.create(ue.create(r,o+l+n),ue.create(r,o+l+d.length+n))}),l+=d.length,a.length===4){l+=a[2].length;let f=a[3];i.push({type:"text",content:f,range:ne.create(ue.create(r,o+l+n),ue.create(r,o+l+f.length+n))})}else i.push({type:"text",content:"",range:ne.create(ue.create(r,o+l+n),ue.create(r,o+l+n))});o=c+a[0].length}let s=e.substring(o);s.length>0&&i.push({type:"text",content:s,range:ne.create(ue.create(r,o+n),ue.create(r,o+n+s.length))})}return i}var KF=/\S/,VF=/\s*$/;function cy(t,e){let r=t.substring(e).match(KF);return r?e+r.index:t.length}function zF(t){let e=t.match(VF);if(e&&typeof e.index=="number")return e.index}function XF(t){var e,r,n,i;let o=ue.create(t.position.line,t.position.character);if(t.tokens.length===0)return new tf([],ne.create(o,o));let s=[];for(;t.index<t.tokens.length;){let u=YF(t,s[s.length-1]);u&&s.push(u)}let a=(r=(e=s[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:o,c=(i=(n=s[s.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:o;return new tf(s,ne.create(a,c))}function YF(t,e){let r=t.tokens[t.index];if(r.type==="tag")return mE(t,!1);if(r.type==="text"||r.type==="inline-tag")return pE(t);JF(r,e),t.index++}function JF(t,e){if(e){let r=new rf("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function pE(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(QF(t)),n=e,e=t.tokens[t.index];return new gu(i,ne.create(r.range.start,n.range.end))}function QF(t){return t.tokens[t.index].type==="inline-tag"?mE(t,!0):hE(t)}function mE(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let o=hE(t);return new hu(n,new gu([o],o.range),e,ne.create(r.range.start,o.range.end))}else{let o=pE(t);return new hu(n,o,e,ne.create(r.range.start,o.range.end))}else{let o=r.range;return new hu(n,new gu([],o),e,o)}}function hE(t){let e=t.tokens[t.index++];return new rf(e.content,e.range)}function uy(t){if(!t)return uy({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:ay(e,!0),end:ay(r,!1),line:ay(n,!0)}}function ay(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?jn(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var tf=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=dE(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=dE(r)+i}return r.trim()}},hu=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){var r,n;return(n=(r=e?.renderTag)===null||r===void 0?void 0:r.call(e,this))!==null&&n!==void 0?n:this.toMarkdownDefault(e)}toMarkdownDefault(e){let r=this.content.toMarkdown(e);if(this.inline){let o=ZF(this.name,r,e??{});if(typeof o=="string")return o}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function ZF(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let o=e.indexOf(" "),s=e;if(o>0){let c=cy(e,o);s=e.substring(c),e=e.substring(0,o)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(s=`\`${s}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,s))!==null&&i!==void 0?i:e1(e,s)}}function e1(t,e){try{return Oe.parse(t,!0),`[${e}](${t})`}catch{return t}}var gu=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],o=this.inlines[n+1];r+=i.toMarkdown(e),o&&o.range.start.line>i.range.start.line&&(r+=`
`)}return r}},rf=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function dE(t){return t.endsWith(`
`)?`
`:`

`}var xu=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.commentProvider=e.documentation.CommentProvider}getDocumentation(e){let r=this.commentProvider.getComment(e);if(r&&vu(r))return yu(r).toMarkdown({renderLink:(i,o)=>this.documentationLinkRenderer(e,i,o),renderTag:i=>this.documentationTagRenderer(e,i)})}documentationLinkRenderer(e,r,n){var i;let o=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(o&&o.nameSegment){let s=o.nameSegment.range.start.line+1,a=o.nameSegment.range.start.character+1,c=o.documentUri.with({fragment:`L${s},${a}`});return`[${n}](${c.toString()})`}else return}documentationTagRenderer(e,r){}findNameInPrecomputedScopes(e,r){let i=ot(e).precomputedScopes;if(!i)return;let o=e;do{let a=i.get(o).find(c=>c.name===r);if(a)return a;o=o.$container}while(o)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};var Tu=class{constructor(e){this.grammarConfig=()=>e.parser.GrammarConfig}getComment(e){var r;return nu(e)?e.$comment:(r=Ba(e.$cstNode,this.grammarConfig().multilineCommentRules))===null||r===void 0?void 0:r.text}};var Ru=class{constructor(e){this.syncParser=e.parser.LangiumParser}parse(e,r){return Promise.resolve(this.syncParser.parse(e))}},ly=class{constructor(e){this.threadCount=8,this.terminationDelay=200,this.workerPool=[],this.queue=[],this.hydrator=e.serializer.Hydrator}initializeWorkers(){for(;this.workerPool.length<this.threadCount;){let e=this.createWorker();e.onReady(()=>{if(this.queue.length>0){let r=this.queue.shift();r&&(e.lock(),r.resolve(e))}}),this.workerPool.push(e)}}async parse(e,r){let n=await this.acquireParserWorker(r),i=new Kt,o,s=r.onCancellationRequested(()=>{o=setTimeout(()=>{this.terminateWorker(n)},this.terminationDelay)});return n.parse(e).then(a=>{let c=this.hydrator.hydrate(a);i.resolve(c)}).catch(a=>{i.reject(a)}).finally(()=>{s.dispose(),clearTimeout(o)}),i.promise}terminateWorker(e){e.terminate();let r=this.workerPool.indexOf(e);r>=0&&this.workerPool.splice(r,1)}async acquireParserWorker(e){this.initializeWorkers();for(let n of this.workerPool)if(n.ready)return n.lock(),n;let r=new Kt;return e.onCancellationRequested(()=>{let n=this.queue.indexOf(r);n>=0&&this.queue.splice(n,1),r.reject(ln)}),this.queue.push(r),r.promise}},dy=class{get ready(){return this._ready}get onReady(){return this.onReadyEmitter.event}constructor(e,r,n,i){this.onReadyEmitter=new Ie.Emitter,this.deferred=new Kt,this._ready=!0,this._parsing=!1,this.sendMessage=e,this._terminate=i,r(o=>{let s=o;this.deferred.resolve(s),this.unlock()}),n(o=>{this.deferred.reject(o),this.unlock()})}terminate(){this.deferred.reject(ln),this._terminate()}lock(){this._ready=!1}unlock(){this._parsing=!1,this._ready=!0,this.onReadyEmitter.fire()}parse(e){if(this._parsing)throw new Error("Parser worker is busy");return this._parsing=!0,this.deferred=new Kt,this.sendMessage(e),this.deferred.promise}};var Su=class{constructor(){this.previousTokenSource=new G.CancellationTokenSource,this.writeQueue=[],this.readQueue=[],this.done=!0}write(e){this.cancelWrite();let r=zd();return this.previousTokenSource=r,this.enqueue(this.writeQueue,e,r.token)}read(e){return this.enqueue(this.readQueue,e)}enqueue(e,r,n=G.CancellationToken.None){let i=new Kt,o={action:r,deferred:i,cancellationToken:n};return e.push(o),this.performNextOperation(),i.promise}async performNextOperation(){if(!this.done)return;let e=[];if(this.writeQueue.length>0)e.push(this.writeQueue.shift());else if(this.readQueue.length>0)e.push(...this.readQueue.splice(0,this.readQueue.length));else return;this.done=!1,await Promise.all(e.map(async({action:r,deferred:n,cancellationToken:i})=>{try{let o=await Promise.resolve().then(()=>r(i));n.resolve(o)}catch(o){_r(o)?n.resolve(void 0):n.reject(o)}})),this.done=!0,this.performNextOperation()}cancelWrite(){this.previousTokenSource.cancel()}};var bu=class{constructor(e){this.grammarElementIdMap=new eo,this.tokenTypeIdMap=new eo,this.grammar=e.Grammar,this.lexer=e.parser.Lexer,this.linker=e.references.Linker}dehydrate(e){return{lexerErrors:e.lexerErrors,lexerReport:e.lexerReport?this.dehydrateLexerReport(e.lexerReport):void 0,parserErrors:e.parserErrors.map(r=>Object.assign(Object.assign({},r),{message:r.message})),value:this.dehydrateAstNode(e.value,this.createDehyrationContext(e.value))}}dehydrateLexerReport(e){return e}createDehyrationContext(e){let r=new Map,n=new Map;for(let i of Sr(e))r.set(i,{});if(e.$cstNode)for(let i of Ci(e.$cstNode))n.set(i,{});return{astNodes:r,cstNodes:n}}dehydrateAstNode(e,r){let n=r.astNodes.get(e);n.$type=e.$type,n.$containerIndex=e.$containerIndex,n.$containerProperty=e.$containerProperty,e.$cstNode!==void 0&&(n.$cstNode=this.dehydrateCstNode(e.$cstNode,r));for(let[i,o]of Object.entries(e))if(!i.startsWith("$"))if(Array.isArray(o)){let s=[];n[i]=s;for(let a of o)Pe(a)?s.push(this.dehydrateAstNode(a,r)):Et(a)?s.push(this.dehydrateReference(a,r)):s.push(a)}else Pe(o)?n[i]=this.dehydrateAstNode(o,r):Et(o)?n[i]=this.dehydrateReference(o,r):o!==void 0&&(n[i]=o);return n}dehydrateReference(e,r){let n={};return n.$refText=e.$refText,e.$refNode&&(n.$refNode=r.cstNodes.get(e.$refNode)),n}dehydrateCstNode(e,r){let n=r.cstNodes.get(e);return ja(e)?n.fullText=e.fullText:n.grammarSource=this.getGrammarElementId(e.grammarSource),n.hidden=e.hidden,n.astNode=r.astNodes.get(e.astNode),Lr(e)?n.content=e.content.map(i=>this.dehydrateCstNode(i,r)):qn(e)&&(n.tokenType=e.tokenType.name,n.offset=e.offset,n.length=e.length,n.startLine=e.range.start.line,n.startColumn=e.range.start.character,n.endLine=e.range.end.line,n.endColumn=e.range.end.character),n}hydrate(e){let r=e.value,n=this.createHydrationContext(r);return"$cstNode"in r&&this.hydrateCstNode(r.$cstNode,n),{lexerErrors:e.lexerErrors,lexerReport:e.lexerReport,parserErrors:e.parserErrors,value:this.hydrateAstNode(r,n)}}createHydrationContext(e){let r=new Map,n=new Map;for(let o of Sr(e))r.set(o,{});let i;if(e.$cstNode)for(let o of Ci(e.$cstNode)){let s;"fullText"in o?(s=new ra(o.fullText),i=s):"content"in o?s=new Yi:"tokenType"in o&&(s=this.hydrateCstLeafNode(o)),s&&(n.set(o,s),s.root=i)}return{astNodes:r,cstNodes:n}}hydrateAstNode(e,r){let n=r.astNodes.get(e);n.$type=e.$type,n.$containerIndex=e.$containerIndex,n.$containerProperty=e.$containerProperty,e.$cstNode&&(n.$cstNode=r.cstNodes.get(e.$cstNode));for(let[i,o]of Object.entries(e))if(!i.startsWith("$"))if(Array.isArray(o)){let s=[];n[i]=s;for(let a of o)Pe(a)?s.push(this.setParent(this.hydrateAstNode(a,r),n)):Et(a)?s.push(this.hydrateReference(a,n,i,r)):s.push(a)}else Pe(o)?n[i]=this.setParent(this.hydrateAstNode(o,r),n):Et(o)?n[i]=this.hydrateReference(o,n,i,r):o!==void 0&&(n[i]=o);return n}setParent(e,r){return e.$container=r,e}hydrateReference(e,r,n,i){return this.linker.buildReference(r,n,i.cstNodes.get(e.$refNode),e.$refText)}hydrateCstNode(e,r,n=0){let i=r.cstNodes.get(e);if(typeof e.grammarSource=="number"&&(i.grammarSource=this.getGrammarElement(e.grammarSource)),i.astNode=r.astNodes.get(e.astNode),Lr(i))for(let o of e.content){let s=this.hydrateCstNode(o,r,n++);i.content.push(s)}return i}hydrateCstLeafNode(e){let r=this.getTokenType(e.tokenType),n=e.offset,i=e.length,o=e.startLine,s=e.startColumn,a=e.endLine,c=e.endColumn,u=e.hidden;return new Xi(n,i,{start:{line:o,character:s},end:{line:a,character:c}},r,u)}getTokenType(e){return this.lexer.definition[e]}getGrammarElementId(e){if(e)return this.grammarElementIdMap.size===0&&this.createGrammarElementIdMap(),this.grammarElementIdMap.get(e)}getGrammarElement(e){return this.grammarElementIdMap.size===0&&this.createGrammarElementIdMap(),this.grammarElementIdMap.getKey(e)}createGrammarElementIdMap(){let e=0;for(let r of Sr(this.grammar))wi(r)&&this.grammarElementIdMap.set(r,e++)}};function Eu(t){return{documentation:{CommentProvider:e=>new Tu(e),DocumentationProvider:e=>new xu(e)},parser:{AsyncParser:e=>new Ru(e),GrammarConfig:e=>rh(e),LangiumParser:e=>Xg(e),CompletionParser:e=>zg(e),ValueConverter:()=>new Vc,TokenBuilder:()=>new Qi,Lexer:e=>new oo(e),ParserErrorMessageProvider:()=>new na,LexerErrorMessageProvider:()=>new mu},workspace:{AstNodeLocator:()=>new uu,AstNodeDescriptionProvider:e=>new au(e),ReferenceDescriptionProvider:e=>new cu(e)},references:{Linker:e=>new Jc(e),NameProvider:()=>new Qc,ScopeProvider:e=>new no(e),ScopeComputation:e=>new to(e),References:e=>new Zc(e)},serializer:{Hydrator:e=>new bu(e),JsonSerializer:e=>new ru(e)},validation:{DocumentValidator:e=>new su(e),ValidationRegistry:e=>new ou(e)},shared:()=>t.shared}}function Cu(t){return{ServiceRegistry:e=>new iu(e),workspace:{LangiumDocuments:e=>new Yc(e),LangiumDocumentFactory:e=>new Xc(e),DocumentBuilder:e=>new du(e),IndexManager:e=>new fu(e),WorkspaceManager:e=>new pu(e),FileSystemProvider:e=>t.fileSystemProvider(e),WorkspaceLock:()=>new Su,ConfigurationProvider:e=>new lu(e)}}}var fa;(function(t){t.merge=(e,r)=>nf(nf({},e),r)})(fa||(fa={}));function so(t,e,r,n,i,o,s,a,c){let u=[t,e,r,n,i,o,s,a,c].reduce(nf,{});return xE(u)}var vE=Symbol("isProxy");function _u(t){if(t&&t[vE])for(let e of Object.values(t))_u(e);return t}function xE(t,e){let r=new Proxy({},{deleteProperty:()=>!1,set:()=>{throw new Error("Cannot set property on injected service container")},get:(n,i)=>i===vE?!0:yE(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(yE(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Object.getOwnPropertyNames(t)]});return r}var gE=Symbol();function yE(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===gE)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. Visit https://langium.org/docs/reference/configuration-services/#resolving-cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=gE;try{t[e]=typeof i=="function"?i(n):xE(i,n)}catch(o){throw t[e]=o instanceof Error?o:void 0,o}return t[e]}else return}function nf(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=nf(i,n):t[r]=n}}return t}var fy={indentTokenName:"INDENT",dedentTokenName:"DEDENT",whitespaceTokenName:"WS",ignoreIndentationDelimiters:[]},ao;(function(t){t.REGULAR="indentation-sensitive",t.IGNORE_INDENTATION="ignore-indentation"})(ao||(ao={}));var of=class extends Qi{constructor(e=fy){super(),this.indentationStack=[0],this.whitespaceRegExp=/[ \t]+/y,this.options=Object.assign(Object.assign({},fy),e),this.indentTokenType=ri({name:this.options.indentTokenName,pattern:this.indentMatcher.bind(this),line_breaks:!1}),this.dedentTokenType=ri({name:this.options.dedentTokenName,pattern:this.dedentMatcher.bind(this),line_breaks:!1})}buildTokens(e,r){let n=super.buildTokens(e,r);if(!ef(n))throw new Error("Invalid tokens built by default builder");let{indentTokenName:i,dedentTokenName:o,whitespaceTokenName:s,ignoreIndentationDelimiters:a}=this.options,c,u,l,d=[];for(let f of n){for(let[m,v]of a)f.name===m?f.PUSH_MODE=ao.IGNORE_INDENTATION:f.name===v&&(f.POP_MODE=!0);f.name===o?c=f:f.name===i?u=f:f.name===s?l=f:d.push(f)}if(!c||!u||!l)throw new Error("Some indentation/whitespace tokens not found!");return a.length>0?{modes:{[ao.REGULAR]:[c,u,...d,l],[ao.IGNORE_INDENTATION]:[...d,l]},defaultMode:ao.REGULAR}:[c,u,l,...d]}flushLexingReport(e){let r=super.flushLexingReport(e);return Object.assign(Object.assign({},r),{remainingDedents:this.flushRemainingDedents(e)})}isStartOfLine(e,r){return r===0||`\r
`.includes(e[r-1])}matchWhitespace(e,r,n,i){var o;this.whitespaceRegExp.lastIndex=r;let s=this.whitespaceRegExp.exec(e);return{currIndentLevel:(o=s?.[0].length)!==null&&o!==void 0?o:0,prevIndentLevel:this.indentationStack.at(-1),match:s}}createIndentationTokenInstance(e,r,n,i){let o=this.getLineNumber(r,i);return _n(e,n,i,i+n.length,o,o,1,n.length)}getLineNumber(e,r){return e.substring(0,r).split(/\r\n|\r|\n/).length}indentMatcher(e,r,n,i){if(!this.isStartOfLine(e,r))return null;let{currIndentLevel:o,prevIndentLevel:s,match:a}=this.matchWhitespace(e,r,n,i);return o<=s?null:(this.indentationStack.push(o),a)}dedentMatcher(e,r,n,i){var o,s,a,c;if(!this.isStartOfLine(e,r))return null;let{currIndentLevel:u,prevIndentLevel:l,match:d}=this.matchWhitespace(e,r,n,i);if(u>=l)return null;let f=this.indentationStack.lastIndexOf(u);if(f===-1)return this.diagnostics.push({severity:"error",message:`Invalid dedent level ${u} at offset: ${r}. Current indentation stack: ${this.indentationStack}`,offset:r,length:(s=(o=d?.[0])===null||o===void 0?void 0:o.length)!==null&&s!==void 0?s:0,line:this.getLineNumber(e,r),column:1}),null;let m=this.indentationStack.length-f-1,v=(c=(a=e.substring(0,r).match(/[\r\n]+$/))===null||a===void 0?void 0:a[0].length)!==null&&c!==void 0?c:1;for(let T=0;T<m;T++){let C=this.createIndentationTokenInstance(this.dedentTokenType,e,"",r-(v-1));n.push(C),this.indentationStack.pop()}return null}buildTerminalToken(e){let r=super.buildTerminalToken(e),{indentTokenName:n,dedentTokenName:i,whitespaceTokenName:o}=this.options;return r.name===n?this.indentTokenType:r.name===i?this.dedentTokenType:r.name===o?ri({name:o,pattern:this.whitespaceRegExp,group:Fe.SKIPPED}):r}flushRemainingDedents(e){let r=[];for(;this.indentationStack.length>1;)r.push(this.createIndentationTokenInstance(this.dedentTokenType,e,"",e.length)),this.indentationStack.pop();return this.indentationStack=[0],r}},py=class extends oo{constructor(e){if(super(e),e.parser.TokenBuilder instanceof of)this.indentationTokenBuilder=e.parser.TokenBuilder;else throw new Error("IndentationAwareLexer requires an accompanying IndentationAwareTokenBuilder")}tokenize(e,r=Zd){let n=super.tokenize(e),i=n.report;r?.mode==="full"&&n.tokens.push(...i.remainingDedents),i.remainingDedents=[];let{indentTokenType:o,dedentTokenType:s}=this.indentationTokenBuilder,a=o.tokenTypeIdx,c=s.tokenTypeIdx,u=[],l=n.tokens.length-1;for(let d=0;d<l;d++){let f=n.tokens[d],m=n.tokens[d+1];if(f.tokenTypeIdx===a&&m.tokenTypeIdx===c){d++;continue}u.push(f)}return l>=0&&u.push(n.tokens[l]),n.tokens=u,n}};var le={};Fn(le,{AstUtils:()=>Oi,BiMap:()=>eo,Cancellation:()=>G,ContextCache:()=>ro,CstUtils:()=>ul,DONE_RESULT:()=>wt,Deferred:()=>Kt,Disposable:()=>ci,DisposableCache:()=>ua,DocumentCache:()=>Jd,EMPTY_STREAM:()=>Ua,ErrorWithLocation:()=>Ai,GrammarUtils:()=>xl,MultiMap:()=>Ur,OperationCancelled:()=>ln,Reduction:()=>vo,RegExpUtils:()=>yl,SimpleCache:()=>tu,StreamImpl:()=>fr,TreeStreamImpl:()=>Hr,URI:()=>Oe,UriUtils:()=>re,WorkspaceCache:()=>la,assertUnreachable:()=>Vr,delayNextTick:()=>ry,interruptAndCheck:()=>Ve,isOperationCancelled:()=>_r,loadGrammarFromJson:()=>af,setInterruptionPeriod:()=>rE,startCancelableOperation:()=>zd,stream:()=>ee});ae(le,Ie);var sf=class{readFile(){throw new Error("No file system is available.")}async readDirectory(){return[]}},Au={fileSystemProvider:()=>new sf};var t1={Grammar:()=>{},LanguageMetaData:()=>({caseInsensitive:!1,fileExtensions:[".langium"],languageId:"langium"})},r1={AstReflection:()=>new is};function n1(){let t=so(Cu(Au),r1),e=so(Eu({shared:t}),t1);return t.ServiceRegistry.register(e),e}function af(t){var e;let r=n1(),n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,Oe.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}ae(je,le);var Oa=Jt(Ir(),1);function Qv(t,e){let r={stacks:t,tokens:e};return zq(r),r.stacks.flat().forEach(i=>{i.property=void 0}),Ok(r.stacks).map(i=>i[i.length-1])}function Zv(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,o=[],s=e.feature;if(n.has(s))return[];Rr(s)||n.add(s);let a,c=s;for(;c.$container;)if(Rr(c.$container)){a=c.$container;break}else if(wi(c.$container))c=c.$container;else break;if(Zm(c.cardinality)){let u=Pa({next:{feature:c,type:e.type},cardinalities:r,visited:n,plus:i});for(let l of u)i.add(l.feature);o.push(...u)}if(a){let u=a.elements.indexOf(c);u!==void 0&&u<a.elements.length-1&&o.push(...Nk({feature:a,type:e.type},u+1,r,n,i)),o.every(l=>Mi(l.feature.cardinality,l.feature)||Mi(r.get(l.feature))||i.has(l.feature))&&o.push(...Zv({next:{feature:a,type:e.type},cardinalities:r,visited:n,plus:i}))}return o}function mp(t){return Pe(t)&&(t={feature:t}),Pa({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}function Pa(t){var e,r,n;let{next:i,cardinalities:o,visited:s,plus:a}=t;if(i===void 0)return[];let{feature:c,type:u}=i;if(Rr(c))return s.has(c)?[]:(s.add(c),Nk(i,0,o,s,a).map(l=>pp(l,c.cardinality,o)));if(os(c)||ss(c))return c.elements.flatMap(l=>Pa({next:{feature:l,type:u,property:i.property},cardinalities:o,visited:s,plus:a})).map(l=>pp(l,c.cardinality,o));if(Pt(c)){let l={feature:c.terminal,type:u,property:(e=i.property)!==null&&e!==void 0?e:c.feature};return Pa({next:l,cardinalities:o,visited:s,plus:a}).map(d=>pp(d,c.cardinality,o))}else{if(Fr(c))return Zv({next:{feature:c,type:Li(c),property:(r=i.property)!==null&&r!==void 0?r:c.feature},cardinalities:o,visited:s,plus:a});if(Zt(c)&&$e(c.rule.ref)){let l=c.rule.ref,d={feature:l.definition,type:l.fragment||l.dataType?void 0:(n=Xr(l))!==null&&n!==void 0?n:l.name,property:i.property};return Pa({next:d,cardinalities:o,visited:s,plus:a}).map(f=>pp(f,c.cardinality,o))}else return[i]}}function pp(t,e,r){return r.set(t.feature,e),t}function Nk(t,e,r,n,i){var o;let s=[],a;for(;e<t.feature.elements.length&&(a={feature:t.feature.elements[e++],type:t.type},s.push(...Pa({next:a,cardinalities:r,visited:n,plus:i})),!!Mi((o=a.feature.cardinality)!==null&&o!==void 0?o:r.get(a.feature),a.feature)););return s}function zq(t){for(let e of t.tokens){let r=Ok(t.stacks,e);t.stacks=r}}function Ok(t,e){let r=[];for(let n of t)r.push(...Xq(n,e));return r}function Xq(t,e){let r=new Map,n=new Set(t.map(o=>o.feature).filter(Yq)),i=[];for(;t.length>0;){let o=t.pop(),s=Zv({next:o,cardinalities:r,plus:n,visited:new Set}).filter(a=>e?ex(a.feature,e):!0);for(let a of s)i.push([...t,a]);if(!s.every(a=>Mi(a.feature.cardinality,a.feature)||Mi(r.get(a.feature))))break}return i}function Yq(t){if(t.cardinality==="+")return!0;let e=mr(t,Pt);return!!(e&&e.cardinality==="+")}function ex(t,e){if(pt(t))return t.value===e.image;if(Zt(t))return Jq(t.rule.ref,e);if(pr(t)){let r=sc(t);if(r)return ex(r,e)}return!1}function Jq(t,e){return $e(t)?mp(t.definition).some(n=>ex(n.feature,e)):jt(t)?Un(t).test(e.image):!1}function Ik(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}var Na=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.lexer=e.parser.Lexer,this.nodeKindProvider=e.shared.lsp.NodeKindProvider,this.fuzzyMatcher=e.shared.lsp.FuzzyMatcher,this.grammarConfig=e.parser.GrammarConfig,this.astReflection=e.shared.AstReflection,this.documentationProvider=e.documentation.DocumentationProvider}async getCompletion(e,r,n){let i=[],o=this.buildContexts(e,r.position),s=(u,l)=>{let d=this.fillCompletionItem(u,l);d&&i.push(d)},a=u=>pt(u.feature)?u.feature.value:u.feature,c=[];for(let u of o)if(await Promise.all(ee(u.features).distinct(a).exclude(c).map(l=>this.completionFor(u,l,s))),c.push(...u.features),!this.continueCompletion(i))break;return Oa.CompletionList.create(this.deduplicateItems(i),!0)}deduplicateItems(e){return ee(e).distinct(r=>`${r.kind}_${r.label}_${r.detail}`).toArray()}findFeaturesAt(e,r){let n=e.getText({start:Oa.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),o=i.tokens;if(i.tokenIndex===0){let c=ic(this.grammar),u=mp({feature:c.definition,type:Xr(c)});return o.length>0?(o.shift(),Qv(u.map(l=>[l]),o)):u}let s=[...o].splice(i.tokenIndex);return Qv([i.elementStack.map(c=>({feature:c}))],s)}*buildContexts(e,r){var n,i;let o=e.parseResult.value.$cstNode;if(!o)return;let s=e.textDocument,a=s.getText(),c=s.offsetAt(r),u={document:e,textDocument:s,offset:c,position:r},l=this.findDataTypeRuleStart(o,c);if(l){let[g,p]=l,S=(n=Wa(o,g))===null||n===void 0?void 0:n.astNode;yield Object.assign(Object.assign({},u),{node:S,tokenOffset:g,tokenEndOffset:p,features:this.findFeaturesAt(s,g)})}let{nextTokenStart:d,nextTokenEnd:f,previousTokenStart:m,previousTokenEnd:v}=this.backtrackToAnyToken(a,c),T=d;c<=d&&m!==void 0&&(T=m);let C=(i=Wa(o,T))===null||i===void 0?void 0:i.astNode,R=!0;if(m!==void 0&&v!==void 0&&v===c&&(yield Object.assign(Object.assign({},u),{node:C,tokenOffset:m,tokenEndOffset:v,features:this.findFeaturesAt(s,m)}),R=this.performNextTokenCompletion(e,a.substring(m,v),m,v),R&&(yield Object.assign(Object.assign({},u),{node:C,tokenOffset:v,tokenEndOffset:v,features:this.findFeaturesAt(s,v)}))),C)R&&(yield Object.assign(Object.assign({},u),{node:C,tokenOffset:d,tokenEndOffset:f,features:this.findFeaturesAt(s,d)}));else{let g=ic(this.grammar);if(!g)throw new Error("Missing entry parser rule");yield Object.assign(Object.assign({},u),{tokenOffset:d,tokenEndOffset:f,features:mp(g.definition)})}}performNextTokenCompletion(e,r,n,i){return/\P{L}$/u.test(r)}findDataTypeRuleStart(e,r){var n,i;let o=Qt(e,r,this.grammarConfig.nameRegexp),s=!!(!((n=mr(o?.grammarSource,$e))===null||n===void 0)&&n.dataType);if(s){for(;s;)o=o?.container,s=!!(!((i=mr(o?.grammarSource,$e))===null||i===void 0)&&i.dataType);if(o)return[o.offset,o.end]}}continueCompletion(e){return e.length===0}backtrackToAnyToken(e,r){let n=this.lexer.tokenize(e).tokens;if(n.length===0)return{nextTokenStart:r,nextTokenEnd:r};let i;for(let o of n){if(o.startOffset>=r)return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};if(o.endOffset>=r)return{nextTokenStart:o.startOffset,nextTokenEnd:o.endOffset+1,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};i=o}return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0}}completionFor(e,r,n){if(pt(r.feature))return this.completionForKeyword(e,r.feature,n);if(pr(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=mr(r.feature,Pt),o=e.node;if(i&&o){r.type&&(o={$type:r.type,$container:o,$containerProperty:r.property},Za(this.astReflection,o));let s={reference:{$refText:""},container:o,property:i.feature};try{for(let a of this.getReferenceCandidates(s,e))n(e,this.createReferenceCompletionItem(a))}catch(a){console.error(a)}}}getReferenceCandidates(e,r){return this.scopeProvider.getScope(e).getAllElements()}createReferenceCompletionItem(e){let r=this.nodeKindProvider.getCompletionItemKind(e),n=this.getReferenceDocumentation(e);return{nodeDescription:e,kind:r,documentation:n,detail:e.type,sortText:"0"}}getReferenceDocumentation(e){if(!e.node)return;let r=this.documentationProvider.getDocumentation(e.node);if(r)return{kind:"markdown",value:r}}completionForKeyword(e,r,n){this.filterKeyword(e,r)&&n(e,{label:r.value,kind:this.getKeywordCompletionItemKind(r),detail:"Keyword",sortText:"1"})}getKeywordCompletionItemKind(e){return Oa.CompletionItemKind.Keyword}filterKeyword(e,r){return/\p{L}/u.test(r.value)}fillCompletionItem(e,r){var n,i;let o;if(typeof r.label=="string")o=r.label;else if("node"in r){let u=this.nameProvider.getName(r.node);if(!u)return;o=u}else if("nodeDescription"in r)o=r.nodeDescription.name;else return;let s;typeof((n=r.textEdit)===null||n===void 0?void 0:n.newText)=="string"?s=r.textEdit.newText:typeof r.insertText=="string"?s=r.insertText:s=o;let a=(i=r.textEdit)!==null&&i!==void 0?i:this.buildCompletionTextEdit(e,o,s);return a?{additionalTextEdits:r.additionalTextEdits,command:r.command,commitCharacters:r.commitCharacters,data:r.data,detail:r.detail,documentation:r.documentation,filterText:r.filterText,insertText:r.insertText,insertTextFormat:r.insertTextFormat,insertTextMode:r.insertTextMode,kind:r.kind,labelDetails:r.labelDetails,preselect:r.preselect,sortText:r.sortText,tags:r.tags,textEditText:r.textEditText,textEdit:a,label:o}:void 0}buildCompletionTextEdit(e,r,n){let o=e.textDocument.getText().substring(e.tokenOffset,e.offset);if(this.fuzzyMatcher.match(o,r)){let s=e.textDocument.positionAt(e.tokenOffset),a=e.position;return{newText:n,range:{start:s,end:a}}}else return}};var Dk=Jt(Ir(),1);var hp=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r,n){let i=e.parseResult.value;if(i.$cstNode){let o=i.$cstNode,s=Qt(o,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(s)return this.collectLocationLinks(s,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[Dk.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.astNode.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.astNode){let n=ot(r.astNode);if(r&&n)return{source:e,target:r,targetDocument:n}}}};var $k=Jt(Ir(),1);var gp=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r,n){let i=e.parseResult.value.$cstNode;if(!i)return;let o=Qt(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!o)return;let s=this.references.findDeclaration(o);if(s){let a=re.equals(ot(s).uri,e.uri),c={documentUri:e.uri,includeDeclaration:a};return this.references.findReferences(s,c).map(l=>this.createDocumentHighlight(l)).toArray()}}createDocumentHighlight(e){return $k.DocumentHighlight.create(e.segment.range)}};var yp=class{constructor(e){this.nameProvider=e.references.NameProvider,this.nodeKindProvider=e.shared.lsp.NodeKindProvider}getSymbols(e,r,n){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let o=this.nameProvider.getName(r);return[{kind:this.nodeKindProvider.getSymbolKind(r),name:o||i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of Ni(r)){let o=this.getSymbol(e,i);n.push(...o)}if(n.length>0)return n}};var Bu=Jt(Ir(),1);var vp=class{constructor(e){this.workspaceManager=e.workspace.WorkspaceManager,this.documentBuilder=e.workspace.DocumentBuilder,this.workspaceLock=e.workspace.WorkspaceLock,this.serviceRegistry=e.ServiceRegistry;let r=!1;e.lsp.LanguageServer.onInitialize(n=>{var i,o;r=!!(!((o=(i=n.capabilities.workspace)===null||i===void 0?void 0:i.didChangeWatchedFiles)===null||o===void 0)&&o.dynamicRegistration)}),e.lsp.LanguageServer.onInitialized(n=>{r&&this.registerFileWatcher(e)})}registerFileWatcher(e){let r=[],n=ee(e.ServiceRegistry.all).flatMap(o=>o.LanguageMetaData.fileExtensions).map(o=>o.startsWith(".")?o.substring(1):o).distinct().toArray();n.length>0&&r.push({globPattern:n.length===1?`**/*.${n[0]}`:`**/*.{${n.join(",")}}`});let i=ee(e.ServiceRegistry.all).flatMap(o=>{var s;return(s=o.LanguageMetaData.fileNames)!==null&&s!==void 0?s:[]}).distinct().toArray();if(i.length>0&&r.push({globPattern:i.length===1?`**/${i[0]}`:`**/{${i.join(",")}}`}),r.length>0){let o=e.lsp.Connection,s={watchers:r};o?.client.register(Bu.DidChangeWatchedFilesNotification.type,s)}}fireDocumentUpdate(e,r){e=e.filter(n=>this.serviceRegistry.hasServices(n)),this.workspaceManager.ready.then(()=>{this.workspaceLock.write(n=>this.documentBuilder.update(e,r,n))}).catch(n=>{console.error("Workspace initialization failed. Could not perform document update.",n)})}didChangeContent(e){this.fireDocumentUpdate([Oe.parse(e.document.uri)],[])}didChangeWatchedFiles(e){let r=ee(e.changes).filter(i=>i.type!==Bu.FileChangeType.Deleted).distinct(i=>i.uri).map(i=>Oe.parse(i.uri)).toArray(),n=ee(e.changes).filter(i=>i.type===Bu.FileChangeType.Deleted).distinct(i=>i.uri).map(i=>Oe.parse(i.uri)).toArray();this.fireDocumentUpdate(r,n)}};var Wu=Jt(Ir(),1);var xp=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e,r,n){let i=[],o=s=>i.push(s);return this.collectFolding(e,o),i}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let o=hr(i).iterator(),s;do if(s=o.next(),!s.done){let a=s.value;this.shouldProcess(a)&&this.collectObjectFolding(e,a,r),this.shouldProcessContent(a)||o.prune()}while(!s.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let o=this.toFoldingRange(e,i);o&&n(o)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let o of gm(i))if(this.commentNames.includes(o.tokenType.name)){let s=this.toFoldingRange(e,o,Wu.FoldingRangeKind.Comment);s&&n(s)}}}toFoldingRange(e,r,n){let i=r.range,o=i.start,s=i.end;if(!(s.line-o.line<2))return this.includeLastFoldingLine(r,n)||(s=e.textDocument.positionAt(e.textDocument.offsetAt({line:s.line,character:0})-1)),Wu.FoldingRange.create(o.line,s.line,o.character,s.character,n)}includeLastFoldingLine(e,r){if(r===Wu.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};var Tp=class{match(e,r){if(e.length===0)return!0;let n=!1,i,o=0,s=r.length;for(let a=0;a<s;a++){let c=r.charCodeAt(a),u=e.charCodeAt(o);if((c===u||this.toUpperCharCode(c)===this.toUpperCharCode(u))&&(n||(n=i===void 0||this.isWordTransition(i,c)),n&&o++,o===e.length))return!0;i=c}return!1}isWordTransition(e,r){return Mk<=e&&e<=Lk&&Qq<=r&&r<=Zq||e===Fk&&r!==Fk}toUpperCharCode(e){return Mk<=e&&e<=Lk?e-32:e}},Mk=97,Lk=122,Qq=65,Zq=90,Fk=95;var tx=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let o=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(o){let s=e.textDocument.offsetAt(r.position),a=Qt(o,s,this.grammarConfig.nameRegexp);if(a&&a.offset+a.length>s){let c=this.references.findDeclaration(a);if(c)return this.getAstNodeHoverContent(c);if(pt(a.grammarSource))return this.getKeywordHoverContent(a.grammarSource)}}}getKeywordHoverContent(e){var r;let n=nu(e)?e.$comment:void 0;if(n||(n=(r=Ba(e.$cstNode,["ML_COMMENT"]))===null||r===void 0?void 0:r.text),n&&vu(n)){let i=yu(n).toMarkdown();if(i)return{contents:{kind:"markdown",value:i}}}}},Rp=class extends tx{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};var Dr=Jt(Ze(),1);var ie=Jt(Ir(),1);var ej={[ie.SemanticTokenTypes.class]:0,[ie.SemanticTokenTypes.comment]:1,[ie.SemanticTokenTypes.enum]:2,[ie.SemanticTokenTypes.enumMember]:3,[ie.SemanticTokenTypes.event]:4,[ie.SemanticTokenTypes.function]:5,[ie.SemanticTokenTypes.interface]:6,[ie.SemanticTokenTypes.keyword]:7,[ie.SemanticTokenTypes.macro]:8,[ie.SemanticTokenTypes.method]:9,[ie.SemanticTokenTypes.modifier]:10,[ie.SemanticTokenTypes.namespace]:11,[ie.SemanticTokenTypes.number]:12,[ie.SemanticTokenTypes.operator]:13,[ie.SemanticTokenTypes.parameter]:14,[ie.SemanticTokenTypes.property]:15,[ie.SemanticTokenTypes.regexp]:16,[ie.SemanticTokenTypes.string]:17,[ie.SemanticTokenTypes.struct]:18,[ie.SemanticTokenTypes.type]:19,[ie.SemanticTokenTypes.typeParameter]:20,[ie.SemanticTokenTypes.variable]:21,[ie.SemanticTokenTypes.decorator]:22},tj={[ie.SemanticTokenModifiers.abstract]:1,[ie.SemanticTokenModifiers.async]:2,[ie.SemanticTokenModifiers.declaration]:4,[ie.SemanticTokenModifiers.defaultLibrary]:8,[ie.SemanticTokenModifiers.definition]:16,[ie.SemanticTokenModifiers.deprecated]:32,[ie.SemanticTokenModifiers.documentation]:64,[ie.SemanticTokenModifiers.modification]:128,[ie.SemanticTokenModifiers.readonly]:256,[ie.SemanticTokenModifiers.static]:512},Ore={legend:{tokenTypes:Object.keys(ej),tokenModifiers:Object.keys(tj)},full:{delta:!0},range:!0};function jk(t){let e=[],r=[],n=!0,i=!0,o=!0;for(let s of t)s&&(s.legend.tokenTypes.forEach((a,c)=>{let u=e[c];if(u&&u!==a)throw new Error(`Cannot merge '${u}' and '${a}' token types. They use the same index ${c}.`);e[c]=a}),s.legend.tokenModifiers.forEach((a,c)=>{let u=r[c];if(u&&u!==a)throw new Error(`Cannot merge '${u}' and '${a}' token modifier. They use the same index ${c}.`);r[c]=a}),s.full?typeof s.full=="object"&&!s.full.delta&&(i=!1):n=!1,s.range||(o=!1));return{legend:{tokenTypes:e,tokenModifiers:r},full:n&&{delta:i},range:o}}var qk;(function(t){function e(n,i,o){let s=new Map;Object.entries(i).forEach(([u,l])=>s.set(l,u));let a=0,c=0;return r(n.data,5).map(u=>{a+=u[0],u[0]!==0&&(c=0),c+=u[1];let l=u[2];return{offset:o.textDocument.offsetAt({line:a,character:c}),tokenType:s.get(u[3]),tokenModifiers:u[4],text:o.textDocument.getText({start:{line:a,character:c},end:{line:a,character:c+l}})}})}t.decode=e;function r(n,i){let o=[];for(let s=0;s<n.length;s+=i){let a=n.slice(s,s+i);o.push(a)}return o}})(qk||(qk={}));function Uk(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}var Sp=class{constructor(e){this.onInitializeEmitter=new Dr.Emitter,this.onInitializedEmitter=new Dr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.fireInitializeOnDefaultServices(e),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){_u(this.services),this.services.ServiceRegistry.all.forEach(e=>_u(e))}hasService(e){return this.services.ServiceRegistry.all.some(n=>e(n)!==void 0)}buildInitializeResult(e){var r,n,i,o;let s=this.services.lsp.DocumentUpdateHandler,a=(r=this.services.lsp.FileOperationHandler)===null||r===void 0?void 0:r.fileOperationOptions,c=this.services.ServiceRegistry.all,u=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.Formatter}),l=c.map(L=>{var b,Te;return(Te=(b=L.lsp)===null||b===void 0?void 0:b.Formatter)===null||Te===void 0?void 0:Te.formatOnTypeOptions}).find(L=>!!L),d=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.CodeActionProvider}),f=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.SemanticTokenProvider}),m=jk(c.map(L=>{var b,Te;return(Te=(b=L.lsp)===null||b===void 0?void 0:b.SemanticTokenProvider)===null||Te===void 0?void 0:Te.semanticTokensOptions})),v=(i=(n=this.services.lsp)===null||n===void 0?void 0:n.ExecuteCommandHandler)===null||i===void 0?void 0:i.commands,T=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.DocumentLinkProvider}),C=Uk(c.map(L=>{var b,Te;return(Te=(b=L.lsp)===null||b===void 0?void 0:b.SignatureHelp)===null||Te===void 0?void 0:Te.signatureHelpOptions})),R=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.TypeProvider}),g=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.ImplementationProvider}),p=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.CompletionProvider}),S=Ik(c.map(L=>{var b,Te;return(Te=(b=L.lsp)===null||b===void 0?void 0:b.CompletionProvider)===null||Te===void 0?void 0:Te.completionOptions})),w=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.ReferencesProvider}),Q=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.DocumentSymbolProvider}),Vt=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.DefinitionProvider}),et=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.DocumentHighlightProvider}),dr=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.FoldingRangeProvider}),zt=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.HoverProvider}),I=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.RenameProvider}),_=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.CallHierarchyProvider}),j=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.TypeHierarchyProvider}),M=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.CodeLensProvider}),oe=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.DeclarationProvider}),z=this.hasService(L=>{var b;return(b=L.lsp)===null||b===void 0?void 0:b.InlayHintProvider}),H=(o=this.services.lsp)===null||o===void 0?void 0:o.WorkspaceSymbolProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0},fileOperations:a},executeCommandProvider:v&&{commands:v},textDocumentSync:{change:Dr.TextDocumentSyncKind.Incremental,openClose:!0,save:!!s.didSaveDocument,willSave:!!s.willSaveDocument,willSaveWaitUntil:!!s.willSaveDocumentWaitUntil},completionProvider:p?S:void 0,referencesProvider:w,documentSymbolProvider:Q,definitionProvider:Vt,typeDefinitionProvider:R,documentHighlightProvider:et,codeActionProvider:d,documentFormattingProvider:u,documentRangeFormattingProvider:u,documentOnTypeFormattingProvider:l,foldingRangeProvider:dr,hoverProvider:zt,renameProvider:I?{prepareProvider:!0}:void 0,semanticTokensProvider:f?m:void 0,signatureHelpProvider:C,implementationProvider:g,callHierarchyProvider:_?{}:void 0,typeHierarchyProvider:j?{}:void 0,documentLinkProvider:T?{resolveProvider:!1}:void 0,codeLensProvider:M?{resolveProvider:!1}:void 0,declarationProvider:oe,inlayHintProvider:z?{resolveProvider:!1}:void 0,workspaceSymbolProvider:H?{resolveProvider:!!H.resolveSymbol}:void 0}}}initialized(e){this.fireInitializedOnDefaultServices(e),this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}fireInitializeOnDefaultServices(e){this.services.workspace.ConfigurationProvider.initialize(e),this.services.workspace.WorkspaceManager.initialize(e)}fireInitializedOnDefaultServices(e){let r=this.services.lsp.Connection,n=r?Object.assign(Object.assign({},e),{register:i=>r.client.register(Dr.DidChangeConfigurationNotification.type,i),fetchConfiguration:i=>r.workspace.getConfiguration(i)}):e;this.services.workspace.ConfigurationProvider.initialized(n).catch(i=>console.error("Error in ConfigurationProvider initialization:",i)),this.services.workspace.WorkspaceManager.initialized(e).catch(i=>console.error("Error in WorkspaceManager initialization:",i))}};function Bk(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");rj(e,t),nj(e,t),ij(e,t),oj(e,t),sj(e,t),cj(e,t),uj(e,t),lj(e,t),dj(e,t),pj(e,t),hj(e,t),gj(e,t),aj(e,t),yj(e,t),mj(e,t),vj(e,t),xj(e,t),Rj(e,t),bj(e,t),_j(e,t),Aj(e,t),Ej(e,t),Sj(e,t),Tj(e,t),fj(e,t),Cj(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>{t.lsp.LanguageServer.initialized(n)}),t.workspace.TextDocuments.listen(e),e.listen()}function rj(t,e){let r=e.lsp.DocumentUpdateHandler,n=e.workspace.TextDocuments;r.didOpenDocument&&n.onDidOpen(i=>r.didOpenDocument(i)),r.didChangeContent&&n.onDidChangeContent(i=>r.didChangeContent(i)),r.didCloseDocument&&n.onDidClose(i=>r.didCloseDocument(i)),r.didSaveDocument&&n.onDidSave(i=>r.didSaveDocument(i)),r.willSaveDocument&&n.onWillSave(i=>r.willSaveDocument(i)),r.willSaveDocumentWaitUntil&&n.onWillSaveWaitUntil(i=>r.willSaveDocumentWaitUntil(i)),r.didChangeWatchedFiles&&t.onDidChangeWatchedFiles(i=>r.didChangeWatchedFiles(i))}function nj(t,e){let r=e.lsp.FileOperationHandler;r&&(r.didCreateFiles&&t.workspace.onDidCreateFiles(n=>r.didCreateFiles(n)),r.didRenameFiles&&t.workspace.onDidRenameFiles(n=>r.didRenameFiles(n)),r.didDeleteFiles&&t.workspace.onDidDeleteFiles(n=>r.didDeleteFiles(n)),r.willCreateFiles&&t.workspace.onWillCreateFiles(n=>r.willCreateFiles(n)),r.willRenameFiles&&t.workspace.onWillRenameFiles(n=>r.willRenameFiles(n)),r.willDeleteFiles&&t.workspace.onWillDeleteFiles(n=>r.willDeleteFiles(n)))}function ij(t,e){let r=e.workspace.DocumentBuilder;r.onUpdate(async(n,i)=>{for(let o of i)t.sendDiagnostics({uri:o.toString(),diagnostics:[]})}),r.onDocumentPhase(B.Validated,async n=>{n.diagnostics&&t.sendDiagnostics({uri:n.uri.toString(),diagnostics:n.diagnostics})})}function oj(t,e){t.onCompletion(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.CompletionProvider)===null||a===void 0?void 0:a.getCompletion(n,i,o)},e,B.IndexedReferences))}function sj(t,e){t.onReferences(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.ReferencesProvider)===null||a===void 0?void 0:a.findReferences(n,i,o)},e,B.IndexedReferences))}function aj(t,e){t.onCodeAction(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.CodeActionProvider)===null||a===void 0?void 0:a.getCodeActions(n,i,o)},e,B.Validated))}function cj(t,e){t.onDocumentSymbol(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.DocumentSymbolProvider)===null||a===void 0?void 0:a.getSymbols(n,i,o)},e,B.Parsed))}function uj(t,e){t.onDefinition(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.DefinitionProvider)===null||a===void 0?void 0:a.getDefinition(n,i,o)},e,B.IndexedReferences))}function lj(t,e){t.onTypeDefinition(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.TypeProvider)===null||a===void 0?void 0:a.getTypeDefinition(n,i,o)},e,B.IndexedReferences))}function dj(t,e){t.onImplementation(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.ImplementationProvider)===null||a===void 0?void 0:a.getImplementation(n,i,o)},e,B.IndexedReferences))}function fj(t,e){t.onDeclaration(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.DeclarationProvider)===null||a===void 0?void 0:a.getDeclaration(n,i,o)},e,B.IndexedReferences))}function pj(t,e){t.onDocumentHighlight(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.DocumentHighlightProvider)===null||a===void 0?void 0:a.getDocumentHighlight(n,i,o)},e,B.IndexedReferences))}function mj(t,e){t.onHover(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.HoverProvider)===null||a===void 0?void 0:a.getHoverContent(n,i,o)},e,B.IndexedReferences))}function hj(t,e){t.onFoldingRanges(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.FoldingRangeProvider)===null||a===void 0?void 0:a.getFoldingRanges(n,i,o)},e,B.Parsed))}function gj(t,e){t.onDocumentFormatting(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.Formatter)===null||a===void 0?void 0:a.formatDocument(n,i,o)},e,B.Parsed)),t.onDocumentRangeFormatting(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.Formatter)===null||a===void 0?void 0:a.formatDocumentRange(n,i,o)},e,B.Parsed)),t.onDocumentOnTypeFormatting(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.Formatter)===null||a===void 0?void 0:a.formatDocumentOnType(n,i,o)},e,B.Parsed))}function yj(t,e){t.onRenameRequest(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.RenameProvider)===null||a===void 0?void 0:a.rename(n,i,o)},e,B.IndexedReferences)),t.onPrepareRename(Lt((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.RenameProvider)===null||a===void 0?void 0:a.prepareRename(n,i,o)},e,B.IndexedReferences))}function vj(t,e){t.languages.inlayHint.on(On((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.InlayHintProvider)===null||a===void 0?void 0:a.getInlayHints(n,i,o)},e,B.IndexedReferences))}function xj(t,e){let r={data:[]};t.languages.semanticTokens.on(On((n,i,o,s)=>{var a;return!((a=n.lsp)===null||a===void 0)&&a.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,o,s):r},e,B.IndexedReferences)),t.languages.semanticTokens.onDelta(On((n,i,o,s)=>{var a;return!((a=n.lsp)===null||a===void 0)&&a.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,o,s):r},e,B.IndexedReferences)),t.languages.semanticTokens.onRange(On((n,i,o,s)=>{var a;return!((a=n.lsp)===null||a===void 0)&&a.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,o,s):r},e,B.IndexedReferences))}function Tj(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}function Rj(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var o;try{return await r.executeCommand(n.command,(o=n.arguments)!==null&&o!==void 0?o:[],i)}catch(s){return In(s)}})}function Sj(t,e){t.onDocumentLinks(On((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.DocumentLinkProvider)===null||a===void 0?void 0:a.getDocumentLinks(n,i,o)},e,B.Parsed))}function bj(t,e){t.onSignatureHelp(On((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.SignatureHelp)===null||a===void 0?void 0:a.provideSignatureHelp(n,i,o)},e,B.IndexedReferences))}function Ej(t,e){t.onCodeLens(On((r,n,i,o)=>{var s,a;return(a=(s=r.lsp)===null||s===void 0?void 0:s.CodeLensProvider)===null||a===void 0?void 0:a.provideCodeLens(n,i,o)},e,B.IndexedReferences))}function Cj(t,e){var r;let n=e.lsp.WorkspaceSymbolProvider;if(n){let i=e.workspace.DocumentBuilder;t.onWorkspaceSymbol(async(s,a)=>{try{return await i.waitUntil(B.IndexedContent,a),await n.getSymbols(s,a)}catch(c){return In(c)}});let o=(r=n.resolveSymbol)===null||r===void 0?void 0:r.bind(n);o&&t.onWorkspaceSymbolResolve(async(s,a)=>{try{return await i.waitUntil(B.IndexedContent,a),await o(s,a)}catch(c){return In(c)}})}}function _j(t,e){t.languages.callHierarchy.onPrepare(On(async(r,n,i,o)=>{var s;if(!((s=r.lsp)===null||s===void 0)&&s.CallHierarchyProvider){let a=await r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,o);return a??null}return null},e,B.IndexedReferences)),t.languages.callHierarchy.onIncomingCalls(bp(async(r,n,i)=>{var o;if(!((o=r.lsp)===null||o===void 0)&&o.CallHierarchyProvider){let s=await r.lsp.CallHierarchyProvider.incomingCalls(n,i);return s??null}return null},e)),t.languages.callHierarchy.onOutgoingCalls(bp(async(r,n,i)=>{var o;if(!((o=r.lsp)===null||o===void 0)&&o.CallHierarchyProvider){let s=await r.lsp.CallHierarchyProvider.outgoingCalls(n,i);return s??null}return null},e))}function Aj(t,e){e.ServiceRegistry.all.some(r=>{var n;return(n=r.lsp)===null||n===void 0?void 0:n.TypeHierarchyProvider})&&(t.languages.typeHierarchy.onPrepare(On(async(r,n,i,o)=>{var s,a;let c=await((a=(s=r.lsp)===null||s===void 0?void 0:s.TypeHierarchyProvider)===null||a===void 0?void 0:a.prepareTypeHierarchy(n,i,o));return c??null},e,B.IndexedReferences)),t.languages.typeHierarchy.onSupertypes(bp(async(r,n,i)=>{var o,s;let a=await((s=(o=r.lsp)===null||o===void 0?void 0:o.TypeHierarchyProvider)===null||s===void 0?void 0:s.supertypes(n,i));return a??null},e)),t.languages.typeHierarchy.onSubtypes(bp(async(r,n,i)=>{var o,s;let a=await((s=(o=r.lsp)===null||o===void 0?void 0:o.TypeHierarchyProvider)===null||s===void 0?void 0:s.subtypes(n,i));return a??null},e)))}function bp(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let o=Oe.parse(n.item.uri),s=await rx(e,i,o,B.IndexedReferences);if(s)return s;if(!r.hasServices(o)){let c=`Could not find service instance for uri: '${o}'`;return console.debug(c),In(new Error(c))}let a=r.getServices(o);try{return await t(a,n,i)}catch(c){return In(c)}}}function On(t,e,r){let n=e.workspace.LangiumDocuments,i=e.ServiceRegistry;return async(o,s)=>{let a=Oe.parse(o.textDocument.uri),c=await rx(e,s,a,r);if(c)return c;if(!i.hasServices(a)){let l=`Could not find service instance for uri: '${a}'`;return console.debug(l),In(new Error(l))}let u=i.getServices(a);try{let l=await n.getOrCreateDocument(a);return await t(u,l,o,s)}catch(l){return In(l)}}}function Lt(t,e,r){let n=e.workspace.LangiumDocuments,i=e.ServiceRegistry;return async(o,s)=>{let a=Oe.parse(o.textDocument.uri),c=await rx(e,s,a,r);if(c)return c;if(!i.hasServices(a))return console.debug(`Could not find service instance for uri: '${a.toString()}'`),null;let u=i.getServices(a);try{let l=await n.getOrCreateDocument(a);return await t(u,l,o,s)}catch(l){return In(l)}}}async function rx(t,e,r,n){if(n!==void 0){let i=t.workspace.DocumentBuilder;try{await i.waitUntil(n,r,e)}catch(o){return In(o)}}}function In(t){if(_r(t))return new Dr.ResponseError(Dr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof Dr.ResponseError)return t;throw t}var Cp=Jt(Ir(),1),Ep=class{getSymbolKind(e){return Cp.SymbolKind.Field}getCompletionItemKind(e){return Cp.CompletionItemKind.Reference}};var Wk=Jt(Ir(),1);var _p=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r,n){let i=e.parseResult.value.$cstNode;if(!i)return[];let o=Qt(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return o?this.getReferences(o,r,e):[]}getReferences(e,r,n){let i=[],o=this.references.findDeclaration(e);if(o){let s={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(o,s).forEach(a=>{i.push(Wk.Location.create(a.sourceUri.toString(),a.segment.range))})}return i}};zi();var Ap=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r,n){let i={},o=e.parseResult.value.$cstNode;if(!o)return;let s=e.textDocument.offsetAt(r.position),a=Qt(o,s,this.grammarConfig.nameRegexp);if(!a)return;let c=this.references.findDeclaration(a);if(!c)return;let u={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(c,u).forEach(d=>{let f=Cr.replace(d.segment.range,r.newName),m=d.sourceUri.toString();i[m]?i[m].push(f):i[m]=[f]}),{changes:i}}prepareRename(e,r,n){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let o=Qt(n,i,this.grammarConfig.nameRegexp);if(!o)return;if(this.references.findDeclaration(o)||this.isNameNode(o))return o.range}}isNameNode(e){return e?.astNode&&Yd(e.astNode)&&e===this.nameProvider.getNameNode(e.astNode)}};var kp=class{constructor(e){this.indexManager=e.workspace.IndexManager,this.nodeKindProvider=e.lsp.NodeKindProvider,this.fuzzyMatcher=e.lsp.FuzzyMatcher}async getSymbols(e,r=G.CancellationToken.None){let n=[],i=e.query.toLowerCase();for(let o of this.indexManager.allElements())if(await Ve(r),this.fuzzyMatcher.match(i,o.name)){let s=this.getWorkspaceSymbol(o);s&&n.push(s)}return n}getWorkspaceSymbol(e){let r=e.nameSegment;if(r)return{kind:this.nodeKindProvider.getSymbolKind(e),name:e.name,location:{range:r.range,uri:e.documentUri.toString()}}}};var St=Jt(Ir(),1);var Gu=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new St.Emitter,this._onDidOpen=new St.Emitter,this._onDidClose=new St.Emitter,this._onDidSave=new St.Emitter,this._onWillSave=new St.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(re.normalize(e))}set(e){let r=re.normalize(e.uri),n=!0;this._syncedDocuments.has(r)&&(n=!1),this._syncedDocuments.set(r,e);let i=Object.freeze({document:e});return this._onDidOpen.fire(i),this._onDidChangeContent.fire(i),n}delete(e){let r=re.normalize(typeof e=="object"&&"uri"in e?e.uri:e),n=this._syncedDocuments.get(r);n!==void 0&&(this._syncedDocuments.delete(r),this._onDidClose.fire(Object.freeze({document:n})))}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=St.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=re.normalize(i.uri),s=this._configuration.create(o,i.languageId,i.version,i.text);this._syncedDocuments.set(o,s);let a=Object.freeze({document:s});this._onDidOpen.fire(a),this._onDidChangeContent.fire(a)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:s}=i;if(s==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=re.normalize(i.uri),c=this._syncedDocuments.get(a);c!==void 0&&(c=this._configuration.update(c,o,s),this._syncedDocuments.set(a,c),this._onDidChangeContent.fire(Object.freeze({document:c})))})),r.push(e.onDidCloseTextDocument(n=>{let i=re.normalize(n.textDocument.uri),o=this._syncedDocuments.get(i);o!==void 0&&(this._syncedDocuments.delete(i),this._onDidClose.fire(Object.freeze({document:o})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(re.normalize(n.textDocument.uri));i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(re.normalize(n.textDocument.uri));return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(re.normalize(n.textDocument.uri));i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),St.Disposable.create(()=>{r.forEach(n=>n.dispose())})}},wp=class{constructor(e){this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new St.Emitter,this._onDidSave=new St.Emitter,this._onDidChange=new St.Emitter,this._onDidClose=new St.Emitter,"listen"in e?this._cellTextDocuments=e:this._cellTextDocuments=new Gu(e)}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(re.normalize(e))}getNotebookCell(e){let r=this.notebookCellMap.get(re.normalize(e));return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"||"scheme"in e?e:e.document,n=this.notebookCellMap.get(re.normalize(r));return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new Pp,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{let o=re.normalize(i.notebookDocument.uri);this.notebookDocuments.set(o,i.notebookDocument);for(let s of i.cellTextDocuments)r.openTextDocument({textDocument:s});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=re.normalize(i.notebookDocument.uri),s=this.notebookDocuments.get(o);if(s===void 0)return;s.version=i.notebookDocument.version;let a=s.metadata,c=!1,u=i.change;u.metadata!==void 0&&(c=!0,s.metadata=u.metadata);let l=[],d=[],f=[],m=[];if(u.cells!==void 0){let g=u.cells;if(g.structure!==void 0){let p=g.structure.array;if(s.cells.splice(p.start,p.deleteCount,...p.cells!==void 0?p.cells:[]),g.structure.didOpen!==void 0)for(let S of g.structure.didOpen)r.openTextDocument({textDocument:S}),l.push(S.uri);if(g.structure.didClose)for(let S of g.structure.didClose)r.closeTextDocument({textDocument:S}),d.push(S.uri)}if(g.data!==void 0){let p=new Map(g.data.map(S=>[S.document,S]));for(let S=0;S<=s.cells.length;S++){let w=p.get(s.cells[S].document);if(w!==void 0){let Q=s.cells.splice(S,1,w);if(f.push({old:Q[0],new:w}),p.delete(w.document),p.size===0)break}}}if(g.textContent!==void 0)for(let p of g.textContent)r.changeTextDocument({textDocument:p.document,contentChanges:p.changes}),m.push(p.document.uri)}this.updateCellMap(s);let v={notebookDocument:s};c&&(v.metadata={old:a,new:s.metadata});let T=[];for(let g of l)T.push(this.getNotebookCell(g));let C=[];for(let g of d)C.push(this.getNotebookCell(g));let R=[];for(let g of m)R.push(this.getNotebookCell(g));(T.length>0||C.length>0||f.length>0||R.length>0)&&(v.cells={added:T,removed:C,changed:{data:f,textContent:R}}),(v.metadata!==void 0||v.cells!==void 0)&&this._onDidChange.fire(v)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.getNotebookDocument(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=re.normalize(i.notebookDocument.uri),s=this.notebookDocuments.get(o);if(s!==void 0){this._onDidClose.fire(s);for(let a of i.cellTextDocuments)r.closeTextDocument({textDocument:a});this.notebookDocuments.delete(o);for(let a of s.cells)this.notebookCellMap.delete(a.document)}})),St.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}},Pp=class t{onDidOpenTextDocument(e){return this.openHandler=e,St.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,St.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,St.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return t.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return t.NULL_DISPOSE}onDidSaveTextDocument(){return t.NULL_DISPOSE}};Pp.NULL_DISPOSE=Object.freeze({dispose:()=>{}});function Gk(t){return fa.merge(Eu(t),kj(t))}function kj(t){return{lsp:{CompletionProvider:e=>new Na(e),DocumentSymbolProvider:e=>new yp(e),HoverProvider:e=>new Rp(e),FoldingRangeProvider:e=>new xp(e),ReferencesProvider:e=>new _p(e),DefinitionProvider:e=>new hp(e),DocumentHighlightProvider:e=>new gp(e),RenameProvider:e=>new Ap(e)},shared:()=>t.shared}}function Hk(t){return fa.merge(Cu(t),wj(t))}function wj(t){return{lsp:{Connection:()=>t.connection,LanguageServer:e=>new Sp(e),DocumentUpdateHandler:e=>new vp(e),WorkspaceSymbolProvider:e=>new kp(e),NodeKindProvider:()=>new Ep,FuzzyMatcher:()=>new Tp},workspace:{TextDocuments:()=>new Gu(ai),NotebookDocuments:e=>new wp(e.workspace.TextDocuments)}}}var Ma=Jt(Vk(),1);var zk="Element";var lx="Expression";function Jk(t){return ke.isInstance(t,lx)}var Xk="Properties";var Yk="PropertiesOverride";var Np="Variable";var Lp="AtomicModel";function mo(t){return ke.isInstance(t,Lp)}var Ti="AtomicShortModel";function Dn(t){return ke.isInstance(t,Ti)}var Hu="BinaryExpression";function ur(t){return ke.isInstance(t,Hu)}var Op="BooleanExpression";var Ri="CoupledModel";function Zp(t){return ke.isInstance(t,Ri)}var Fp="CouplingDefinition";function Qk(t){return ke.isInstance(t,Fp)}var nx="FileImport";var Ip="IntegerExpression";var ix="InternalTransitionCase";var ox="Model";var sx="ModelImports";var Ku="ModelReference";function Qu(t){return ke.isInstance(t,Ku)}var qp="OBJECT";function Si(t){return ke.isInstance(t,qp)}var jp="OBJECT_OVERRIDE";function Zu(t){return ke.isInstance(t,jp)}var Vu="ObjectExpression";function Da(t){return ke.isInstance(t,Vu)}var Up="OutputCase";function Zk(t){return ke.isInstance(t,Up)}var Bp="OutputMap";function em(t){return ke.isInstance(t,Bp)}var Dp="Port";var ax="PortConfiguration";var zu="PortReference";function Tr(t){return ke.isInstance(t,zu)}var Wp="ReceiveCase";function tm(t){return ke.isInstance(t,Wp)}var Gp="ReceiveCondition";function el(t){return ke.isInstance(t,Gp)}var Hp="ReceiveCondition2";function rm(t){return ke.isInstance(t,Hp)}var cx="ReceiveConditionWithOverride";var Kp="ReceiveConditionWithOverride2";function ew(t){return ke.isInstance(t,Kp)}var Ia="State";function $a(t){return ke.isInstance(t,Ia)}var Vp="StateConfiguration";function nm(t){return ke.isInstance(t,Vp)}var zp="StateDefinitionOverrides";function $n(t){return ke.isInstance(t,zp)}var Xp="StateDefinitionOverridesWithBecome";function im(t){return ke.isInstance(t,Xp)}var $p="StateName";var ux="StateTypes";var Mp="StringExpression";var Yp="TimeAdvanceCase";function dx(t){return ke.isInstance(t,Yp)}var Jp="TimeAdvanceCondition";function tl(t){return ke.isInstance(t,Jp)}var Qp="TimeAdvanceStateConfiguration";function tw(t){return ke.isInstance(t,Qp)}var Xu="VariableOverride";function om(t){return ke.isInstance(t,Xu)}var Yu="VariableReference";function lr(t){return ke.isInstance(t,Yu)}var Ju=class extends bi{getAllTypes(){return[Lp,Ti,Hu,Op,Ri,Fp,zk,lx,nx,Ip,ix,ox,sx,Ku,qp,jp,Vu,Up,Bp,Dp,ax,zu,Xk,Yk,Wp,Gp,Hp,cx,Kp,Ia,Vp,zp,Xp,$p,ux,Mp,Yp,Jp,Qp,Np,Xu,Yu]}computeIsSubtype(e,r){switch(e){case Ti:case Ri:case Ia:return this.isSubtype(zk,r);case Hu:case zu:case Yu:return this.isSubtype(lx,r);case Op:case Ip:case Vu:case Mp:return this.isSubtype(Np,r);case Np:return this.isSubtype(Xk,r);case Xu:return this.isSubtype(Yk,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"AtomicModel:stateType":case"AtomicShortModel:stateType":case"ModelReference:stateType":return Ia;case"CouplingDefinition:sourceModel":case"CouplingDefinition:targetModel":return Ku;case"CouplingDefinition:sourcePort":case"CouplingDefinition:targetPort":case"OutputMap:portRef":case"PortReference:property":case"ReceiveCondition:portRef":return Dp;case"ModelImports:atomicModel":case"ModelReference:atomicModel":return Ti;case"ModelImports:coupledModel":case"ModelReference:coupledModel":return Ri;case"ReceiveCase:stateRef":case"StateConfiguration:stateRef":case"StateDefinitionOverrides:initialState":case"StateDefinitionOverridesWithBecome:stateRef":case"StateTypes:initialState":case"TimeAdvanceCondition:stateRef":return $p;case"VariableOverride:ref":case"VariableReference:property":return Np;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case Lp:return{name:Lp,properties:[{name:"definitionOverrides"},{name:"internalTransitionCases",defaultValue:[]},{name:"name"},{name:"outputCases",defaultValue:[]},{name:"ports"},{name:"receiveCase",defaultValue:[]},{name:"stateType"},{name:"timeAdvanceCases",defaultValue:[]}]};case Ti:return{name:Ti,properties:[{name:"definitionOverrides"},{name:"name"},{name:"ports"},{name:"published",defaultValue:!1},{name:"stateConfiguration",defaultValue:[]},{name:"stateType"}]};case Hu:return{name:Hu,properties:[{name:"left"},{name:"operator"},{name:"right"}]};case Op:return{name:Op,properties:[{name:"name"},{name:"value"}]};case Ri:return{name:Ri,properties:[{name:"couplings",defaultValue:[]},{name:"models",defaultValue:[]},{name:"name"},{name:"ports"},{name:"published",defaultValue:!1}]};case Fp:return{name:Fp,properties:[{name:"sourceModel"},{name:"sourcePort"},{name:"targetModel"},{name:"targetPort"},{name:"thisSourceModel",defaultValue:!1},{name:"thisTargetModel",defaultValue:!1}]};case nx:return{name:nx,properties:[{name:"file"},{name:"modelImport"}]};case Ip:return{name:Ip,properties:[{name:"name"},{name:"value"}]};case ix:return{name:ix,properties:[{name:"condition"},{name:"name"},{name:"overrides"}]};case ox:return{name:ox,properties:[{name:"elements",defaultValue:[]},{name:"fileImports",defaultValue:[]}]};case sx:return{name:sx,properties:[{name:"atomicModel"},{name:"coupledModel"}]};case Ku:return{name:Ku,properties:[{name:"atomicModel"},{name:"coupledModel"},{name:"definitionOverrides"},{name:"name"},{name:"stateType"}]};case qp:return{name:qp,properties:[{name:"properties",defaultValue:[]}]};case jp:return{name:jp,properties:[{name:"properties",defaultValue:[]}]};case Vu:return{name:Vu,properties:[{name:"name"},{name:"value"}]};case Up:return{name:Up,properties:[{name:"condition"},{name:"output",defaultValue:[]}]};case Bp:return{name:Bp,properties:[{name:"expression"},{name:"portRef"}]};case Dp:return{name:Dp,properties:[{name:"name"},{name:"type"},{name:"valueType"}]};case ax:return{name:ax,properties:[{name:"ports",defaultValue:[]}]};case zu:return{name:zu,properties:[{name:"portType"},{name:"property"},{name:"selector"}]};case Wp:return{name:Wp,properties:[{name:"receive",defaultValue:[]},{name:"stateRef"}]};case Gp:return{name:Gp,properties:[{name:"expression"},{name:"portRef",defaultValue:[]}]};case Hp:return{name:Hp,properties:[{name:"expression"},{name:"name"}]};case cx:return{name:cx,properties:[{name:"condition"},{name:"overrides"}]};case Kp:return{name:Kp,properties:[{name:"condition"},{name:"overrides"}]};case Ia:return{name:Ia,properties:[{name:"name"},{name:"properties",defaultValue:[]},{name:"stateType"}]};case Vp:return{name:Vp,properties:[{name:"output",defaultValue:[]},{name:"stateRef"},{name:"timeAdvance"},{name:"transitions",defaultValue:[]}]};case zp:return{name:zp,properties:[{name:"initialState"},{name:"properties",defaultValue:[]}]};case Xp:return{name:Xp,properties:[{name:"properties",defaultValue:[]},{name:"stateRef"}]};case $p:return{name:$p,properties:[{name:"name"}]};case ux:return{name:ux,properties:[{name:"initialState"},{name:"StateName",defaultValue:[]}]};case Mp:return{name:Mp,properties:[{name:"name"},{name:"value"}]};case Yp:return{name:Yp,properties:[{name:"condition"},{name:"defaultTimeAdvance"},{name:"timeAdvance"}]};case Jp:return{name:Jp,properties:[{name:"expression"},{name:"stateRef"}]};case Qp:return{name:Qp,properties:[{name:"timeAdvance"}]};case Xu:return{name:Xu,properties:[{name:"ref"},{name:"value"}]};case Yu:return{name:Yu,properties:[{name:"property",defaultValue:[]}]};default:return{name:e,properties:[]}}}},ke=new Ju;var rw,nw=()=>rw??(rw=af(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "Reel",
  "rules": [
    {
      "$type": "ParserRule",
      "entry": true,
      "name": "Model",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "fileImports",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Assignment",
            "feature": "elements",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            },
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Element",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@7"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@2"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CoupledModel",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "published",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "export"
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "coupled"
          },
          {
            "$type": "Keyword",
            "value": "model"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "ports",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "models",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Assignment",
            "feature": "couplings",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CouplingDefinition",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Connect"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "thisSourceModel",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "this"
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "sourceModel",
                    "operator": "=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@4"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@50"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  }
                ]
              },
              {
                "$type": "Keyword",
                "value": "."
              },
              {
                "$type": "Assignment",
                "feature": "sourcePort",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@19"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@50"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Keyword",
                "value": "to"
              },
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "targetModel",
                    "operator": "=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@4"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@50"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "thisTargetModel",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "this"
                    }
                  }
                ]
              },
              {
                "$type": "Keyword",
                "value": "."
              },
              {
                "$type": "Assignment",
                "feature": "targetPort",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@19"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@50"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ModelReference",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "atomicModel",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@7"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@50"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@50"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": "with"
              },
              {
                "$type": "Assignment",
                "feature": "stateType",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@29"
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "definitionOverrides",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@24"
                  },
                  "arguments": []
                },
                "cardinality": "?"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "coupledModel",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@2"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@50"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@50"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FileImport",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "import"
          },
          {
            "$type": "Assignment",
            "feature": "modelImport",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@6"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "from"
          },
          {
            "$type": "Assignment",
            "feature": "file",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@52"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ModelImports",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "atomic"
              },
              {
                "$type": "Assignment",
                "feature": "atomicModel",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@7"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@50"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "coupled"
              },
              {
                "$type": "Assignment",
                "feature": "coupledModel",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@2"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@50"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AtomicShortModel",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "published",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "export"
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "atomic2"
          },
          {
            "$type": "Keyword",
            "value": "model"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "state"
              },
              {
                "$type": "Keyword",
                "value": ":"
              },
              {
                "$type": "Assignment",
                "feature": "stateType",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@29"
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "definitionOverrides",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@24"
                  },
                  "arguments": []
                },
                "cardinality": "?"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "ports",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "stateConfiguration",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@9"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PortConfiguration",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "section"
          },
          {
            "$type": "Keyword",
            "value": "Ports"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "ports",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@19"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StateConfiguration",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "stateDefinition"
          },
          {
            "$type": "Assignment",
            "feature": "stateRef",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@31"
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "timeAdvance",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@10"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "transitions"
              },
              {
                "$type": "Keyword",
                "value": ":"
              },
              {
                "$type": "Keyword",
                "value": "{"
              },
              {
                "$type": "Assignment",
                "feature": "transitions",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@15"
                  },
                  "arguments": []
                },
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": "}"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "output"
              },
              {
                "$type": "Keyword",
                "value": ":"
              },
              {
                "$type": "Keyword",
                "value": "{"
              },
              {
                "$type": "Assignment",
                "feature": "output",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@21"
                  },
                  "arguments": []
                },
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": "}"
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TimeAdvanceStateConfiguration",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "time-advance"
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "timeAdvance",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@40"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "TimeUnits"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AtomicModel",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "atomic"
          },
          {
            "$type": "Keyword",
            "value": "model"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "state"
              },
              {
                "$type": "Keyword",
                "value": ":"
              },
              {
                "$type": "Assignment",
                "feature": "stateType",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@29"
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "definitionOverrides",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@24"
                  },
                  "arguments": []
                },
                "cardinality": "?"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "ports",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "section"
              },
              {
                "$type": "Keyword",
                "value": "TimeAdvance"
              },
              {
                "$type": "Keyword",
                "value": "{"
              },
              {
                "$type": "Assignment",
                "feature": "timeAdvanceCases",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@22"
                  },
                  "arguments": []
                },
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": "}"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "section"
              },
              {
                "$type": "Keyword",
                "value": "internalTransition"
              },
              {
                "$type": "Keyword",
                "value": "{"
              },
              {
                "$type": "Assignment",
                "feature": "internalTransitionCases",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@18"
                  },
                  "arguments": []
                },
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": "}"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "section"
              },
              {
                "$type": "Keyword",
                "value": "externalTransition"
              },
              {
                "$type": "Keyword",
                "value": "{"
              },
              {
                "$type": "Assignment",
                "feature": "receiveCase",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@13"
                  },
                  "arguments": []
                },
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": "}"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "section"
              },
              {
                "$type": "Keyword",
                "value": "Output"
              },
              {
                "$type": "Keyword",
                "value": "{"
              },
              {
                "$type": "Assignment",
                "feature": "outputCases",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@20"
                  },
                  "arguments": []
                },
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": "}"
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PortType",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "InPort"
          },
          {
            "$type": "Keyword",
            "value": "OutPort"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReceiveCase",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "state"
          },
          {
            "$type": "Keyword",
            "value": "."
          },
          {
            "$type": "Keyword",
            "value": "name"
          },
          {
            "$type": "Keyword",
            "value": "is"
          },
          {
            "$type": "Assignment",
            "feature": "stateRef",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@31"
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "receive",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@14"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReceiveConditionWithOverride",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@16"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "=>"
          },
          {
            "$type": "Assignment",
            "feature": "overrides",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReceiveConditionWithOverride2",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@17"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "=>"
          },
          {
            "$type": "Assignment",
            "feature": "overrides",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReceiveCondition",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "receive"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "portRef",
                "operator": "+=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@19"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@50"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "portRef",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@19"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@50"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  }
                ],
                "cardinality": "*"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "with"
              },
              {
                "$type": "Assignment",
                "feature": "expression",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@40"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReceiveCondition2",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "with"
              },
              {
                "$type": "Assignment",
                "feature": "expression",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@40"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "InternalTransitionCase",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "condition"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@23"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "=>"
          },
          {
            "$type": "Assignment",
            "feature": "overrides",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Port",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "valueType",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "string"
                },
                {
                  "$type": "Keyword",
                  "value": "int"
                },
                {
                  "$type": "Keyword",
                  "value": "bool"
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@38"
                  },
                  "arguments": []
                }
              ]
            }
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@12"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "OutputCase",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@23"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "=>"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "output",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@21"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "OutputMap",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "portRef",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@19"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@50"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "expression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@40"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TimeAdvanceCase",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "condition",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@23"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Keyword",
                    "value": "=>"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "timeAdvance",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@40"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Keyword",
                    "value": "TimeUnits"
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "default"
                  },
                  {
                    "$type": "Keyword",
                    "value": "=>"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "defaultTimeAdvance",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@40"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Keyword",
                    "value": "TimeUnits"
                  }
                ]
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TimeAdvanceCondition",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "state"
          },
          {
            "$type": "Keyword",
            "value": "."
          },
          {
            "$type": "Keyword",
            "value": "name"
          },
          {
            "$type": "Keyword",
            "value": "is"
          },
          {
            "$type": "Assignment",
            "feature": "stateRef",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@31"
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "with"
              },
              {
                "$type": "Assignment",
                "feature": "expression",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@40"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StateDefinitionOverrides",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Keyword",
            "value": "initial"
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "initialState",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@31"
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          },
          {
            "$type": "Assignment",
            "feature": "properties",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StateDefinitionOverridesWithBecome",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "state"
              },
              {
                "$type": "Keyword",
                "value": "."
              },
              {
                "$type": "Keyword",
                "value": "name"
              },
              {
                "$type": "Keyword",
                "value": "becomes"
              },
              {
                "$type": "Assignment",
                "feature": "stateRef",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@31"
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Keyword",
                "value": ";"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "properties",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@41"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ";"
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PropertiesOverride",
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@27"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VariableOverride",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "ref",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@33"
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Keyword",
                "value": "="
              },
              {
                "$type": "Assignment",
                "feature": "value",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@51"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ";"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "ref",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@33"
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Keyword",
                "value": "="
              },
              {
                "$type": "Assignment",
                "feature": "value",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@39"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ";"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "ref",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@33"
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Keyword",
                "value": "="
              },
              {
                "$type": "Assignment",
                "feature": "value",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@52"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ";"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "ref",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@33"
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Keyword",
                "value": "="
              },
              {
                "$type": "Assignment",
                "feature": "value",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@28"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "OBJECT_OVERRIDE",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "properties",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "State",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "state"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "stateType",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@30"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "properties",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@32"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StateTypes",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "states"
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Keyword",
            "value": "["
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "StateName",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@31"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "|"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "StateName",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@31"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "]"
          },
          {
            "$type": "Keyword",
            "value": ";"
          },
          {
            "$type": "Keyword",
            "value": "initial"
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "initialState",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@31"
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StateName",
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@50"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Properties",
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@33"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Variable",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@34"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "bool"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "="
              },
              {
                "$type": "Assignment",
                "feature": "value",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@39"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "IntegerExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "int"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "="
              },
              {
                "$type": "Assignment",
                "feature": "value",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@51"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StringExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "string"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "="
              },
              {
                "$type": "Assignment",
                "feature": "value",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@52"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ObjectExpression",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "object"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@38"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "OBJECT",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "properties",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@32"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanValue",
      "dataType": "boolean",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "true"
          },
          {
            "$type": "Keyword",
            "value": "false"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Expression",
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@41"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Assignment",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expression"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@42"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "BinaryExpression"
                },
                "feature": "left",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "operator",
                "operator": "=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "="
                }
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@42"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Addition",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expression"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "BinaryExpression"
                },
                "feature": "left",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "operator",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "+"
                    },
                    {
                      "$type": "Keyword",
                      "value": "-"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@43"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Multiplication",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expression"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@44"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "BinaryExpression"
                },
                "feature": "left",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "operator",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "*"
                    },
                    {
                      "$type": "Keyword",
                      "value": "/"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@44"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Logical",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expression"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@45"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "BinaryExpression"
                },
                "feature": "left",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "operator",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "and"
                    },
                    {
                      "$type": "Keyword",
                      "value": "or"
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@45"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Comparison",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expression"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@46"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "BinaryExpression"
                },
                "feature": "left",
                "operator": "="
              },
              {
                "$type": "Assignment",
                "feature": "operator",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "<"
                    },
                    {
                      "$type": "Keyword",
                      "value": "<="
                    },
                    {
                      "$type": "Keyword",
                      "value": ">"
                    },
                    {
                      "$type": "Keyword",
                      "value": ">="
                    },
                    {
                      "$type": "Keyword",
                      "value": "=="
                    },
                    {
                      "$type": "Keyword",
                      "value": "!="
                    }
                  ]
                }
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@46"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Primary",
      "inferredType": {
        "$type": "InferredType",
        "name": "Expression"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@40"
                },
                "arguments": []
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ]
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@52"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@51"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": "Infinity"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@48"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@47"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PortReference",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "portType",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@12"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "property",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@19"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@50"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "."
              },
              {
                "$type": "Assignment",
                "feature": "selector",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "first"
                    },
                    {
                      "$type": "Keyword",
                      "value": "any"
                    },
                    {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@51"
                      },
                      "arguments": []
                    }
                  ]
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VariableReference",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "property",
            "operator": "+=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@33"
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "."
              },
              {
                "$type": "Assignment",
                "feature": "property",
                "operator": "+=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@33"
                  },
                  "deprecatedSyntax": false
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "definition": {
        "$type": "RegexToken",
        "regex": "/\\\\s+/"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "definition": {
        "$type": "RegexToken",
        "regex": "/[_a-zA-Z][\\\\w_]*/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "INT",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "/[0-9]+/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "definition": {
        "$type": "RegexToken",
        "regex": "/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "/\\\\/\\\\/[^\\\\n\\\\r]*/"
      },
      "fragment": false
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "imports": [],
  "interfaces": [],
  "types": [],
  "usedGrammars": []
}`));var Pj={languageId:"reel",fileExtensions:[".reel"],caseInsensitive:!1,mode:"development"},iw={AstReflection:()=>new Ju},ow={Grammar:()=>nw(),LanguageMetaData:()=>Pj,parser:{}};var Be=class t{static inferType(e){return e.ref?.$type??"unknown"}static CheckType(e,r){if(Tr(e)){if(r&&e.property?.ref?.type===r)return{error:`Port type '${e.property.ref?.type}' is not allowed here.`,node:e,property:"property",which:"left"};switch(e.property?.ref?.valueType){case"bool":return"BooleanExpression";case"int":return"IntegerExpression";case"string":return"StringExpression"}if(Si(e.property?.ref?.valueType))return"ObjectExpression"}if(lr(e))return this.inferType(e.property[e.property.length-1]);if(ur(e))return this.checkBinary(e,r);let n=e.$cstNode.text;return n===void 0?{error:`Type '${e}' is not correct`,node:e,property:"left"}:isNaN(n)?n==="true"||n==="false"?"BooleanExpression":"StringExpression":"IntegerExpression"}static checkBinary(e,r){let n=this.CheckType(e.left,r);if(t.isError(n))return{...n,which:"left"};let i=this.CheckType(e.right,r);return t.isError(i)?{...i,which:"right"}:((e.operator==="and"||e.operator==="or")&&(Tr(e.right)&&(i="BooleanExpression"),Tr(e.left)&&(n="BooleanExpression")),n!==i?{error:`Type '${n}' is not compatible to type '${i}' 2.`,node:e,property:"left",which:"left"}:this.isComparisonOperator(e.operator)?"BooleanExpression":n)}static CompareLeftRightHasError(e,r,n,i){return t.isError(e)?(i("error",`Type '${e.node} is not correct'.`,{node:e.node,property:e.property}),!0):t.isError(r)?(i("error",`Type '${r.error}' is not compatible to type '${r.node}'.`,{node:r.node,property:r.property}),!0):e!==r?(i("error",`Type '${e}' is not compatible to type '${r}'.`,{node:n,property:"left"}),!0):!1}static isError(e){return e.error!==void 0}static GetTopExpression(e){let r=e;for(;ur(r.$container);)r=r.$container;return r}static isComparisonOperator(e){return e==="!="||e==="=="||e==="<"||e==="<="||e===">"||e===">="}static isBinaryOrBoolean(e){return ur(e)||lr(e)&&e.property[e.property.length-1].ref?.$type==="BooleanExpression"}static GetUsedPorts(e){if(e!==void 0){if(Tr(e))return[e];if(ur(e)){let r=this.GetUsedPorts(e.left),n=this.GetUsedPorts(e.right);return[...r??[],...n??[]]}if(lr(e))return[]}}static AllowedPortTypes(e,r,n){if(!(r===void 0||r.length===0)){if(Tr(e)){r.some(i=>i.property?.ref?.name===e.property?.ref?.name)||n("error",`Port '${e.property?.ref?.name}' is not allowed here. Port must be asserted in condition.`,{node:e,property:"property"});return}if(ur(e)){this.AllowedPortTypes(e.left,r,n),this.AllowedPortTypes(e.right,r,n);return}}}static GetVariables(e){let r=[];if(ur(e)&&(r.push(...this.GetVariables(e.left)),r.push(...this.GetVariables(e.right))),lr(e)){let n=e.property.map(i=>i.ref?.name??"").join(".");r.push(n)}return Tr(e)&&r.push(e.property?.ref?.name??""),r}};function sw(t){let e=t.validation.ValidationRegistry,r=t.validation.ReelValidator,n={VariableOverride:r.checkVariableDeclaration,State:r.checkUniqueParams,StateDefinitionOverrides:r.checkUniqueParamsStateOverride,OBJECT_OVERRIDE:r.checkUniqueParamsObjectOverride,ObjectExpression:r.checkUniqueParamsObjectExpression,Expression:r.binaryExpressionCheck,OutputMap:r.outputMapCheck,OutputCase:r.outputCaseCheck,TimeAdvanceStateConfiguration:r.timeAdvanceCaseCheck,ReceiveCondition2:r.receiveCondition2Check,StateDefinitionOverridesWithBecome:r.stateDefinitionOverridesWithBecomeCheck,PortConfiguration:r.portConfigurationCheck,CouplingDefinition:r.couplingDefinitionCheck};e.register(n,r)}var sm=class{checkUniqueParamsObjectOverride(e,r){let n=new Set;e.properties.forEach(i=>{n.has(i.ref.ref?.name)&&r("error",`Param ${i.ref.ref?.name} is non-unique for Def '${i.ref.ref?.name}'`,{node:i,property:"ref"}),n.add(i.ref.ref?.name)})}portConfigurationCheck(e,r){let n=new Set;e.ports.forEach(i=>{n.has(i?.name)&&r("error",`Param ${i?.name} is non-unique for Def '${i?.name}'`,{node:i,property:"name"}),n.add(i?.name)})}couplingDefinitionCheck(e,r){let n=e.sourcePort.ref?.valueType,i=e.targetPort.ref?.valueType;if(!(n===void 0||i===void 0)){if(Si(n)){Si(i)?Si(i)&&n.properties.forEach(o=>{let s=i.properties.find(u=>u.name===o.name),a=e.thisTargetModel?e.$container.name:e.targetModel?.ref?.name??"",c=e.thisSourceModel?e.$container.name:e.sourceModel?.ref?.name??"";s===void 0?r("error",`Property '${o.name}'  does not exist in ${a}.${e.targetPort.ref?.name}'.`,{node:e,property:"targetPort"}):(o.$type!==s.$type||o.name!==s.name)&&r("error",`Property '${o.name}' in ${c}.${e.sourcePort.ref?.name} is not assignable to property '${s.name}' in ${a}.${e.targetPort.ref?.name}
						Must be of type '${o.$type}' but is of type '${s.$type}'.
						`,{node:e,property:"targetPort"})}):r("error",`Type '${i}' is not assignable to type '${n}'.`,{node:e,property:"targetPort"});return}n!==i&&r("error",`Type '${i}' is not assignable to type '${n}'.`,{node:e,property:"targetPort"})}}checkUniqueParamsObjectExpression(e,r){let n=new Set;e.value.properties.forEach(i=>{n.has(i.name)&&r("error",`Param ${i.name} is non-unique for Def '${i.name}'`,{node:i,property:"name"}),n.add(i.name)})}outputCaseCheck(e,r){let n=new Set;e.output.forEach(i=>{i.portRef.ref?.name&&n.has(i.portRef.ref?.name)&&r("error",`Param ${i.portRef.ref?.name} is non-unique for Def '${i.portRef.ref?.name}'`,{node:i,property:"portRef"}),i.portRef.ref?.name&&n.add(i.portRef.ref?.name)})}outputMapCheck(e,r){let n=e.portRef.ref;if(n===void 0)return;let i=Be.CheckType(e.expression);if(i==="unknown"){r("error",`Type '${i}' is not assignable to type '${n.$type}'.`,{node:e,property:"expression"});return}if(Be.isError(i)){r("error",`Type '${i.error}' is not compatible to type '${i.node}'.`,{node:i.node,property:i.property});return}let o=!0;switch(n.valueType){case"bool":o=i==="BooleanExpression";break;case"int":o=i==="IntegerExpression";break;case"string":o=i==="StringExpression";break}o||r("error",`Type '${i}' is not assignable to type '${n.valueType}'.`,{node:e,property:"expression"})}checkUniqueParams(e,r){let n=new Set;e.properties.forEach(i=>{n.has(i.name)&&r("error",`Param ${i.name} is non-unique for Def '${e.name}'`,{node:i,property:"name"}),n.add(i.name)})}checkUniqueParamsStateOverride(e,r){let n=new Set;e.properties.forEach(i=>{n.has(i.ref.ref?.name)&&r("error",`Param ${i.ref.ref?.name} is non-unique for Def '${i.ref.ref?.name}'`,{node:i,property:"ref"}),n.add(i.ref.ref?.name)})}checkVariableDeclaration(e,r){if(e.ref!==void 0&&e.value!==void 0){let n=Be.inferType(e.ref),i=this.inferRightType(e.value);if(i==="unknown"||n==="unknown"){r("error",`Type '${i}' is not assignable to type '${n}'.`,{node:e,property:"value"});return}if(i!==n){r("error",`Type '${i}' is not assignable to type '${n}'.`,{node:e,property:"value"});return}}}inferRightType(e){return typeof e=="string"?"StringExpression":typeof e=="number"?"IntegerExpression":typeof e=="boolean"?"BooleanExpression":typeof e=="object"?"ObjectExpression":typeof e}binaryExpressionCheck(e,r){if(Tr(e)||lr(e))return;let n=Be.GetTopExpression(e);if(n.operator==="="){if(!lr(n.left)){r("error","Left side of assignment must be a VariableReference.",{node:n.left,property:"left"});return}let o=Be.CheckType(n.right),s=Be.CheckType(n.left);if(Be.isError(o)){r("error",`Type '${o.error}' is not compatible to type '${o.node}' in assignment.`,{node:o.node,property:o.property});return}if(s!==o){r("error",`Type '${o}' is not assignable to type '${s}' in assignment.`,{node:e,property:"right"});return}}}timeAdvanceCaseCheck(e,r){if(Tr(e.timeAdvance)){r("error","PortReference is not allowed in TimeAdvanceStateConfiguration.",{node:e.timeAdvance,property:"property"});return}if(e.timeAdvance===void 0){r("error","Required value 'timeAdvance' is missing.",{node:e,property:"timeAdvance"});return}if(e.timeAdvance.$cstNode?.text!=="Infinity"){if(lr(e.timeAdvance)){let n=Be.CheckType(e.timeAdvance);n!=="IntegerExpression"&&r("error",`Type '${n}' is not assignable to type 'IntegerExpression'.`,{node:e.timeAdvance,property:"property"});return}if(ur(e.timeAdvance)){let n=Be.GetTopExpression(e.timeAdvance),i=Be.CheckType(n);i!=="IntegerExpression"&&r("error",`Type '${i}' is not assignable to type 'IntegerExpression'.`,{node:e.timeAdvance,property:"operator"})}}}stateDefinitionOverridesWithBecomeCheck(e,r){if(e.properties?.forEach(n=>{let i=Be.CheckType(n,"OutPort");if(Be.isError(i)){r("error",i.error,{node:i.node,property:"PortType"});return}}),ew(e.$container)){let n=Be.GetUsedPorts(e.$container.condition.expression);e.properties.forEach(i=>{Be.AllowedPortTypes(i,n,r)})}}receiveCondition2Check(e,r){let n=e.expression;if(n!==void 0){if(Tr(n)&&n.portType==="OutPort"){r("error","OutPort is not valid in transition condition.",{node:n,property:"property"});return}if(lr(n)){let i=Be.CheckType(n);i!=="BooleanExpression"&&r("error",`Type '${i}' is not assignable to type 'BooleanExpression'.`,{node:n,property:"property"});return}if(ur(n)){let i=Be.GetTopExpression(n),o=Be.CheckType(i,"OutPort");if(o!=="BooleanExpression"){let s=Be.isError(o)?o.error:`Type '${o}' is not assignable to type 'BooleanExpression'.`;r("error",s,{node:n,property:Be.isError(o)?o.which:"operator"})}}}}};var Xe=class t{static getNestedObjectExpression(e,r){let n=e;for(let i=r.length-1;i>=0;i--){let o;if($a(n)?o=n?.properties.find(s=>s.name===r[i]):Da(n)&&(o=n.value.properties.find(s=>s.name===r[i])),!(Da(o)||$a(o)))return;n=o}if(Da(n))return n;throw new Error("No object expression found")}static getStateFromObjectOverride(e){let r=[],n=e;for(;!$n(n);)r.push(n.$container.ref.$nodeDescription?.name??""),n=n.$container.$container;if($n(n))return{state:n,path:r};throw new Error("No state found for object expression")}static getStateFromVariableReference(e){let r=e.$container;for(;ur(r);)r=r.$container;return dx(r)?r.$container.stateType.ref:tl(r)?r.$container.$container.stateType.ref:el(r)?t.getAtomicModel(r.$container.$container)?.stateType.ref:t.getAtomicModel(r)?.stateType.ref}static getAllVariables(e){let r=[],n=e.properties;for(let i of n)r.push(i),Da(i)&&(n=i.value.properties,r.push(...this.getAllVariablesFromObjectExpre(i)));return r}static getAllVariablesFromObjectExpre(e){let r=[];for(let n of e.value.properties)r.push(n),Da(n)&&r.push(...this.getAllVariablesFromObjectExpre(n));return r}static getAtomicModel(e){if($n(e))switch(e.$container.$type){case"ModelReference":if(Qu(e.$container)){if(e.$container.atomicModel!==void 0)return e.$container.atomicModel.ref;if(e.$container.coupledModel!==void 0)return}break;case"AtomicModel":if(mo(e.$container))return e.$container;break;case"AtomicShortModel":if(Dn(e.$container))return e.$container;break}if(tm(e))return e.$container;if(tw(e))return e.$container.$container;if(el(e))return e.$container.$container.$container;if(Zk(e))return e.$container;if(im(e))return mo(e.$container.$container)?e.$container.$container:e.$container.$container.$container;if(em(e))return e.$container.$container;if(rm(e))return e.$container.$container.$container;if(nm(e)||dx(e))return e.$container;if(tl(e))return e.$container.$container;if(ur(e)){let r=Be.GetTopExpression(e);if(ur(r.$container))throw new Error("Top expression is not a state configuration");return this.getAtomicModel(r.$container)}}};var Nj=re.dirname,am=class extends no{getScope(e){switch(e.container.$type){case"ModelImports":if(e.property==="")return this.getExportedModelsFromGlobalScope(e);break;case"AtomicShortModel":return e.property==="stateType"?super.getScope(e):(console.log("context.container",e.container),this.getImportedModelsFromCurrentFile(e,"AtomicShortModel"));case"CoupledModel":return this.getImportedModelsFromCurrentFile(e,"CoupledModel")}if(e.property==="ref"&&om(e.container)){let r=e.container;if(!r.ref)return super.getScope(e);if(mo(r.$container.$container)){let i=r.$container.$container.stateType;return i.ref===void 0?super.getScope(e):this.scopeState(i.ref)}if(Dn(r.$container.$container)){let i=r.$container.$container.stateType;return i.ref===void 0?super.getScope(e):this.scopeState(i.ref)}if(Qu(r.$container.$container)){let i=r.$container.$container.atomicModel;return i?.ref?.stateType.ref===void 0?super.getScope(e):this.scopeState(i.ref.stateType.ref)}if(Zu(r.$container)){let{state:i,path:o}=Xe.getStateFromObjectOverride(r.$container);if(i.$container?.stateType?.ref===void 0)return super.getScope(e);let s=Xe.getNestedObjectExpression(i.$container.stateType.ref,o);return s===void 0?super.getScope(e):this.scopeObjectExpression(s)}}if(Jk(e.container),lr(e.container)){let r=e.container,n=Xe.getStateFromVariableReference(r);if(n===void 0)return super.getScope(e);if(e.index===0)return this.scopeState(n);let i=r.property.map(s=>s.$refText).reverse().slice(r.property.length-(e.index??0));if(console.log(i),i.length===0)return this.scopeState(n);let o=Xe.getNestedObjectExpression(n,i);return o===void 0?this.scopeAllVariablesOfState(n):(console.log(o),this.scopeObjectExpression(o))}if(tl(e.container))return e.container.$container.$container.stateType.ref===void 0?super.getScope(e):this.createScopeForNodes(e.container.$container.$container.stateType.ref?.stateType?.StateName.map(n=>({$type:n.$type,$containerIndex:n.$containerIndex,name:n.name,$containerProperty:n.$containerProperty,$container:n.$container,$containerRef:n.$container,$cstNode:n.$cstNode,$document:n.$document}))??[]);if(tm(e.container)){let r=Xe.getAtomicModel(e.container);return r?.stateType.ref===void 0?super.getScope(e):this.createScopeForNodes(r.stateType.ref?.stateType?.StateName.map(n=>({$type:n.$type,$containerIndex:n.$containerIndex,name:n.name,$containerProperty:n.$containerProperty,$container:n.$container,$containerRef:n.$container,$cstNode:n.$cstNode,$document:n.$document}))??[])}if(rm(e.container)){let r=Xe.getAtomicModel(e.container);return r===void 0?super.getScope(e):this.createScopeForNodes(r?.ports?.ports?.filter(n=>n.type==="InPort").map(n=>({...n,$type:n.valueType}))??[])}if(el(e.container)){let r=Xe.getAtomicModel(e.container);return r===void 0?super.getScope(e):this.createScopeForNodes(r?.ports?.ports?.filter(n=>n.type==="InPort").map(n=>({...n,$type:n.valueType}))??[])}if(em(e.container)){let r=Xe.getAtomicModel(e.container.$container);return r===void 0?super.getScope(e):this.createPortNodes(r?.ports?.ports,"OutPort")}if($n(e.container)){let r=Xe.getAtomicModel(e.container);return r?.stateType.ref===void 0?super.getScope(e):this.createScopeForNodes(r.stateType.ref?.stateType?.StateName.map(n=>({$type:n.$type,$containerIndex:n.$containerIndex,name:n.name,$containerProperty:n.$containerProperty,$container:n.$container,$containerRef:n.$container,$cstNode:n.$cstNode,$document:n.$document}))??[])}if(im(e.container)){let r=Xe.getAtomicModel(e.container);return r?.stateType.ref===void 0?super.getScope(e):this.createScopeForNodes(r.stateType.ref?.stateType?.StateName.map(n=>({$type:n.$type,$containerIndex:n.$containerIndex,name:n.name,$containerProperty:n.$containerProperty,$container:n.$container,$containerRef:n.$container,$cstNode:n.$cstNode,$document:n.$document}))??[])}if(nm(e.container)){let r=Xe.getAtomicModel(e.container);return r?.stateType.ref===void 0?super.getScope(e):this.createScopeForNodes(r.stateType.ref?.stateType?.StateName.map(n=>({$type:n.$type,$containerIndex:n.$containerIndex,name:n.name,$containerProperty:n.$containerProperty,$container:n.$container,$containerRef:n.$container,$cstNode:n.$cstNode,$document:n.$document}))??[])}if(Tr(e.container)){let r=Xe.getAtomicModel(e.container.$container);if(r?.stateType.ref===void 0)return super.getScope(e);let n=e.container.portType;return this.createPortNodes(r?.ports?.ports,n)}if(Qu(e.container)&&e.property==="stateType"&&e.container.atomicModel?.ref?.stateType.$nodeDescription!==void 0)return this.createScope([e.container.atomicModel.ref.stateType.$nodeDescription]);if(Qk(e.container)&&(e.property==="sourcePort"||e.property==="targetPort")){let r=e.container.sourceModel?.ref?.atomicModel?.ref??e.container.sourceModel?.ref?.coupledModel?.ref,n=e.container.targetModel?.ref?.atomicModel?.ref??e.container.targetModel?.ref?.coupledModel?.ref;e.container.thisTargetModel&&e.property==="targetPort"&&(n=e.container.$container),e.container.thisSourceModel&&e.property==="sourcePort"&&(r=e.container.$container);let i=e.property==="sourcePort"?r:n;if(i===void 0)return super.getScope(e);let o=i.ports?.ports??[],s=e.property==="sourcePort"?"OutPort":"InPort";return(e.container.thisTargetModel&&e.property==="targetPort"||e.container.thisSourceModel&&e.property==="sourcePort")&&(s=s==="InPort"?"OutPort":"InPort"),this.createPortNodes(o,s)}return console.log("default: ",e.container.$type),super.getScope(e)}scopeObjectExpression(e){var r=[];return e?.value.properties&&(r=r.concat(e.value.properties.map(n=>({$type:n.$type,name:n.name,$container:n,$containerRef:n.value,$containerType:n.$type,$containerIndex:n.$containerIndex,$containerProperty:n.$containerProperty,$cstNode:n.$cstNode,$document:n.$document})))),this.createScopeForNodes(r)}scopeState(e){var r=[];return e.properties&&(r=r.concat(e.properties.map(n=>({$type:n.$type,name:n.name,$container:e,$containerRef:e,$containerType:e?.$type,$containerIndex:n?.$containerIndex,$containerProperty:n?.$containerProperty,$cstNode:n.$cstNode,$document:n.$document})))),this.createScopeForNodes(r)}scopeAllVariablesOfState(e){var r=[];let n=Xe.getAllVariables(e);return r=r.concat(n.map(i=>({$type:i.$type,name:i.name,$container:i.$container,$containerRef:i.$container,$containerType:i?.$type,$containerIndex:i?.$containerIndex,$containerProperty:i?.$containerProperty,$cstNode:i.$cstNode,$document:i.$document}))),this.createScopeForNodes(r)}createPortNodes(e,r){return this.createScopeForNodes(e?.filter(n=>n.type===r).map(n=>{let i=Si(n.valueType)?"ObjectExpression":n.valueType;return{...n,$type:i}})??[])}getExportedModelsFromGlobalScope(e){let r=Oi.getDocument(e.container),n=r.parseResult.value,i=r.uri,o=Nj(i),s=new Set;for(let u of n.fileImports){let l=this.pathJoin(o.path,u.file),d=i.with({path:l});s.add(d.toString())}let a=this.indexManager.allElements(Ti,s).toArray(),c=this.indexManager.allElements(Ri,s).toArray();return this.createScope([...a,...c])}pathJoin(e){var r="/",n=new RegExp(r+"{1,}","g");return e.join(r).replace(n,r)}getImportedModelsFromCurrentFile(e,r){let i=Oi.getDocument(e.container).parseResult.value,o=i.fileImports.flatMap(a=>{let c=a.modelImport;if(r==="AtomicShortModel"&&c.atomicModel?.ref)return this.descriptions.createDescription(c.atomicModel.ref,c.atomicModel.ref.name);if(r==="CoupledModel"&&c.coupledModel?.ref)return this.descriptions.createDescription(c.coupledModel.ref,c.coupledModel.ref.name)}).filter(a=>a!=null).map(a=>a),s=i.elements.filter(a=>Dn(a)||Zp(a)).map(a=>this.descriptions.createDescription(a,a.name));return this.createScope([...o,...s])}};var ho=Jt(Ir(),1);var cm=class extends Na{completionFor(e,r,n){let i=e.node?.$container;if(r.feature.$type==="CrossReference"&&r.property==="property"){let o=e.node;if(o!==void 0&&lr(o)){let s=Xe.getStateFromVariableReference(o);if(s===void 0)return;let a=o.property.map(u=>u.$refText).reverse().slice(),c=Xe.getNestedObjectExpression(s,a)?.value.properties;for(let u of c??[])n(e,{label:u.name,detail:u.$type,kind:ho.CompletionItemKind.Field});return}}if(r.type==="VariableOverride"&&r.property==="ref"){if(mo(i)){let o=i.stateType.ref?.properties;for(let s of o??[])n(e,{label:s.name,detail:s.$type,kind:ho.CompletionItemKind.Field});return}if($n(i)){let o=i.$container.stateType?.ref?.properties;for(let s of o??[])n(e,{label:s.name,kind:ho.CompletionItemKind.Field});return}if(om(i)){if(Zu(i.$container)){let{state:o,path:s}=Xe.getStateFromObjectOverride(i.$container),a=o.$container.stateType?.ref;if(a===void 0)return;let c=Xe.getNestedObjectExpression(a,s);for(let u of c?.value.properties??[])n(e,{label:u.name,kind:ho.CompletionItemKind.Field});return}if($n(i.$container)){let o=i.$container?.$container?.stateType?.ref?.properties;if(o===void 0)return;for(let s of o??[])n(e,{label:s.name,kind:ho.CompletionItemKind.Field});return}}if(Zu(i)){let{state:o,path:s}=Xe.getStateFromObjectOverride(i),a=o.$container?.stateType?.ref;if(a===void 0)return;let c=Xe.getNestedObjectExpression(a,s);for(let u of c?.value.properties??[])n(e,{label:u.name,kind:ho.CompletionItemKind.Field});return}}else console.log(e,r),super.completionFor(e,r,n)}};var um=class extends to{async computeExports(e){let r=e.parseResult.value;console.log(r.elements);let n=r.elements.filter(s=>(Dn(s)||Zp(s))&&s.published).map(s=>this.descriptions.createDescription(s,s.name)),i=r.elements.filter(s=>Dn(s)&&s.published).map(s=>Dn(s)?s.stateType.$refText:void 0).filter(s=>s!==void 0),o=r.elements.filter(s=>$a(s)).filter(s=>i.includes(s.name)).map(s=>$a(s)?this.descriptions.createDescription(s,s.name):void 0).filter(s=>s!==void 0);return[...n,...o]}};var Oj={references:{ScopeProvider:t=>new am(t),ScopeComputation:t=>new um(t)},validation:{ReelValidator:()=>new sm},lsp:{CompletionProvider:t=>new cm(t)}};function aw(t){let e=so(Hk(t),iw),r=so(Gk({shared:e}),ow,Oj);return e.ServiceRegistry.register(r),sw(r),t.connection||e.workspace.ConfigurationProvider.initialized({}),{shared:e,Reel:r}}var Ij=new Ma.BrowserMessageReader(self),Dj=new Ma.BrowserMessageWriter(self),$j=(0,Ma.createConnection)(Ij,Dj),{shared:Mj}=aw({connection:$j,...Au});Bk(Mj);})();
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
