[参考mole博主的jquery源码分析](http://blog.csdn.net/mole/article/details/43760275)
```js
/**
 * Sizzle方法是Sizzle选择器包的主要入口，jQuery的find方法就是调用该方法获取匹配的节点 
 * 该方法主要完成下列任务： 
 * 1、对于单一选择器，且是ID、Tag、Class三种类型之一，则直接获取并返回结果 
 * 2、对于支持querySelectorAll方法的浏览器，通过执行querySelectorAll方法获取并返回匹配的DOM元素 
 * 3、除上之外则调用select方法获取并返回匹配的DOM元素 
*/
var Sizzle = ( function( window ) {
    /**
     * @param selector 选择器字符串 
     * @param context 执行匹配的最初的上下文（即DOM元素集合）。若context没有赋值，则取document。 
     * @param results 已匹配出的部分最终结果。若results没有赋值，则赋予空数组。 
     * @param seed 初始集合 
    */
    function Sizzle( selector, context, results, seed ) {
        var m, 
            i, 
            elem, 
            nid, 
            match, 
            groups, 
            newSelector,
            newContext = context && context.ownerDocument,

            // nodeType defaults to 9, since context defaults to document
            // nodeType=9 为 doucument
            nodeType = context ? context.nodeType : 9;

            results = results || [];

        // Return early from calls with invalid selector or context
        if ( typeof selector !== "string" || !selector ||
            nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

            return results;
        }

        // Try to shortcut find operations (as opposed to filters) in HTML documents
        if ( !seed ) { // 没有设定seed，则执行if内的语句体 

            if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
                setDocument( context );
            }
            context = context || document;

            if ( documentIsHTML ) { // 若当前过滤的是HTML文档，则执行if内的语句体 

                // If the selector is sufficiently simple, try using a "get*By*" DOM method
                // 如果选择器足够地简单，就可尝试使用" get*By* " 等dom操作方法
                // 若选择器是单一选择器，且是ID、Tag、Class三种类型之一，则直接获取并返回结果
                // (excepting DocumentFragment context, where the methods don't exist)
                // DocumentFragment 不具备dom操作方法
                if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
                    // rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/ 
                    // 用来判断是否是ID、TAG、CLASS类型的单一选择器

                    // ID selector
                    if ( (m = match[1]) ) {

                        // Document context
                        if ( nodeType === 9 ) {
                            if ( (elem = context.getElementById( m )) ) {
                                // Support: IE, Opera, Webkit
                                // TODO: identify versions
                                // getElementById can match elements by name instead of ID
                                // 一些老版本的浏览器会把name当作ID来处理， 返回不正确的结果，所以需要再一次对比返回节点的ID属性 
                                if ( elem.id === m ) {
                                    results.push( elem );
                                    return results;
                                }
                            } else {
                                return results;
                            }

                        // Element context
                        } else {

                            // Support: IE, Opera, Webkit
                            // TODO: identify versions
                            // getElementById can match elements by name instead of ID
                            if ( 
                                newContext && 
                                (elem = newContext.getElementById( m )) &&
                                contains( context, elem ) && // contains(context, elem)用来确认获取的elem是否是当前context对象的子对象 
                                elem.id === m 
                            ) {

                                results.push( elem );
                                return results;
                            }
                        }

                    // Type selector
                    // 标签选择器
                    } else if ( match[2] ) {
                        push.apply( results, context.getElementsByTagName( selector ) );
                        return results;

                    // Class selector
                    // 要做能力检测，是否支持classNames
                    } else if ( (m = match[3]) && support.getElementsByClassName &&
                        context.getElementsByClassName ) {

                        push.apply( results, context.getElementsByClassName( m ) );
                        return results;
                    }
                }

                // Take advantage of querySelectorAll
                // 使用querySelectorAll获取dom
                if ( 
                    support.qsa && // 检测是否支持querySelectorAll
                    !compilerCache[ selector + " " ] && // 
                    // rbuggyQSA 用来修正querySelectorAll的一个BUG 
                    // 该BUG会在某些情况下把当前节点（context）也作为结果返回回来。
                    // 具体方法是，在现有的选择器前加上一个属性选择器：[id=XXX]， 
                    // XXX 为context的id，若context本身没有设置id，则给个默认值expando。  
                    // context.setAttribute( "id", (nid = expando) );
                    (!rbuggyQSA || !rbuggyQSA.test( selector )) 
                ) {

                    if ( nodeType !== 1 ) {
                        newContext = context;
                        newSelector = selector;

                    // qSA looks outside Element context, which is not what we want
                    // qsA 查找context外部的Element，这是我们不想的，因为这扩大了查找范围
                    // Thanks to Andrew Dupont for this workaround technique
                    // Support: IE <=8
                    // Exclude object elements
                    // 排除object elements，从而使得qsA 不去查找context外部的Element
                    } else if ( context.nodeName.toLowerCase() !== "object" ) {

                        // Capture the context ID, setting it first if necessary
                        if ( (nid = context.getAttribute( "id" )) ) {
                            // 正则，给单引号、竖杠、反斜杠前加一个反斜杠
                            nid = nid.replace( rcssescape, fcssescape );
                        } else {
                            context.setAttribute( "id", (nid = expando) );
                        }

                        // Prefix every selector in the list
                        groups = tokenize( selector );
                        i = groups.length;
                        while ( i-- ) {
                            groups[i] = "#" + nid + " " + toSelector( groups[i] );
                        }
                        newSelector = groups.join( "," );

                        // Expand context for sibling selectors
                        newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
                            context;
                    }

                    if ( newSelector ) {
                        /* 
                        * 这里之所以需要用try...catch， 
                        * 是因为jquery所支持的一些选择器是querySelectorAll所不支持的， 
                        * 当使用这些选择器时，querySelectorAll会报非法选择器， 
                        * 故需要jquery自身去实现。 也就是select
                        */ 
                        try {
                            // 将querySelectorAll获取的结果并入results，而后返回resulsts
                            push.apply( results,
                                newContext.querySelectorAll( newSelector )
                            );
                            return results;
                        } catch ( qsaError ) {
                        } finally {
                            if ( nid === expando ) {
                                context.removeAttribute( "id" );
                            }
                        }
                    }
                }
            }
        }

        // All others
        return select( selector.replace( rtrim, "$1" ), context, results, seed );
    }

    /**
     * 往后再看
     * A low-level selection function that works with Sizzle's compiled
     *  selector functions
     * @param {String|Function} selector A selector or a pre-compiled
     *  selector function built with Sizzle.compile
     * @param {Element} context
     * @param {Array} [results]
     * @param {Array} [seed] A set of elements to match against
     */
    select = Sizzle.select = function( selector, context, results, seed ) {
        var i, tokens, token, type, find,
            compiled = typeof selector === "function" && selector,
            match = !seed && tokenize( (selector = compiled.selector || selector) );

        results = results || [];

        // Try to minimize operations if there is only one selector in the list and no seed
        // (the latter of which guarantees us context)
        if ( match.length === 1 ) {

            // Reduce context if the leading compound selector is an ID
            tokens = match[0] = match[0].slice( 0 );
            if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                    context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

                context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
                if ( !context ) {
                    return results;

                // Precompiled matchers will still verify ancestry, so step up a level
                } else if ( compiled ) {
                    context = context.parentNode;
                }

                selector = selector.slice( tokens.shift().value.length );
            }

            // Fetch a seed set for right-to-left matching
            i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
            while ( i-- ) {
                token = tokens[i];

                // Abort if we hit a combinator
                if ( Expr.relative[ (type = token.type) ] ) {
                    break;
                }
                if ( (find = Expr.find[ type ]) ) {
                    // Search, expanding context for leading sibling combinators
                    if ( (seed = find(
                        token.matches[0].replace( runescape, funescape ),
                        rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
                    )) ) {

                        // If seed is empty or no tokens remain, we can return early
                        tokens.splice( i, 1 );
                        selector = seed.length && toSelector( tokens );
                        if ( !selector ) {
                            push.apply( results, seed );
                            return results;
                        }

                        break;
                    }
                }
            }
        }

        // Compile and execute a filtering function if one is not provided
        // Provide `match` to avoid retokenization if we modified the selector above
        ( compiled || compile( selector, match ) )(
            seed,
            context,
            !documentIsHTML,
            results,
            !context || rsibling.test( selector ) && testContext( context.parentNode ) || context
        );
        return results;
    };

    return Sizzle;
} )( window )

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;
```

### 额外
| 节点类型 | nodeName | nodeValue |
| - | :-: | - | 
| 1	| Element	元素名| null |
| 2	| Attr	属性名称 | 属性值 |
| 3	| Text	#text | 节点的内容 |
| 4	| CDATASection #cdata-section | 节点的内容 |
| 5	| EntityReference	实体引用名称 | null |
| 6	| Entity	实体名称 | null |
| 7	| ProcessingInstruction	target | 节点的内容 |
| 8	| Comment	#comment | 注释文本 |
| 9	| Document	#document | null |
| 10| DocumentType	文档类型名称 | null |
| 11| DocumentFragment	#document 片段 | null |
| 12| Notation	符号名称 | null |