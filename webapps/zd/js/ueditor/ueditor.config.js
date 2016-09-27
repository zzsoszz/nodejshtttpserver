/**
 * Created by Administrator on 2016/4/7.
 */
/**
 *  ueditor完整配置项
 *  可以在这里配置整个编辑器的特性
 */
/**************************提示********************************
 * 所有被注释的配置项均为UEditor默认值。
 * 修改默认配置请首先确保已经完全明确该参数的真实用途。
 * 主要有两种修改方案，一种是取消此处注释，然后修改成对应参数；另一种是在实例化编辑器时传入对应参数。
 * 当升级编辑器时，可直接使用旧版配置文件替换新版配置文件,不用担心旧版配置文件中因缺少新功能所需的参数而导致脚本报错。
 **************************提示********************************/


(function () {
    /**
     * 编辑器资源文件根路径。它所表示的含义是：以编辑器实例化页面为当前路径，指向编辑器资源文件（即dialog等文件夹）的路径。
     * 鉴于很多同学在使用编辑器的时候出现的种种路径问题，此处强烈建议大家使用"相对于网站根目录的相对路径"进行配置。
     * "相对于网站根目录的相对路径"也就是以斜杠开头的形如"/myProject/ueditor/"这样的路径。
     * 如果站点中有多个不在同一层级的页面需要实例化编辑器，且引用了同一UEditor的时候，此处的URL可能不适用于每个页面的编辑器。
     * 因此，UEditor提供了针对不同页面的编辑器可单独配置的根路径，具体来说，在需要实例化编辑器的页面最顶部写上如下代码即可。当然，需要令此处的URL等于对应的配置。
     * window.UEDITOR_HOME_URL = "/xxxx/xxxx/";
     */
    var URL = window.UEDITOR_HOME_URL || (function(){

            function PathStack() {

                this.documentURL = self.document.URL || self.location.href;

                this.separator = '/';
                this.separatorPattern = /\\|\//g;
                this.currentDir = './';
                this.currentDirPattern = /^[.]\/]/;

                this.path = this.documentURL;
                this.stack = [];

                this.push( this.documentURL );

            }

            PathStack.isParentPath = function( path ){
                return path === '..';
            };

            PathStack.hasProtocol = function( path ){
                return !!PathStack.getProtocol( path );
            };

            PathStack.getProtocol = function( path ){

                var protocol = /^[^:]*:\/*/.exec( path );

                return protocol ? protocol[0] : null;

            };

            PathStack.prototype = {
                push: function( path ){

                    this.path = path;

                    update.call( this );
                    parse.call( this );

                    return this;

                },
                getPath: function(){
                    return this + "";
                },
                toString: function(){
                    return this.protocol + ( this.stack.concat( [''] ) ).join( this.separator );
                }
            };

            function update() {

                var protocol = PathStack.getProtocol( this.path || '' );

                if( protocol ) {

                    //根协议
                    this.protocol = protocol;

                    //local
                    this.localSeparator = /\\|\//.exec( this.path.replace( protocol, '' ) )[0];

                    this.stack = [];
                } else {
                    protocol = /\\|\//.exec( this.path );
                    protocol && (this.localSeparator = protocol[0]);
                }

            }

            function parse(){

                var parsedStack = this.path.replace( this.currentDirPattern, '' );

                if( PathStack.hasProtocol( this.path ) ) {
                    parsedStack = parsedStack.replace( this.protocol , '');
                }

                parsedStack = parsedStack.split( this.localSeparator );
                parsedStack.length = parsedStack.length - 1;

                for(var i= 0,tempPath,l=parsedStack.length,root = this.stack;i<l;i++){
                    tempPath = parsedStack[i];
                    if(tempPath){
                        if( PathStack.isParentPath( tempPath ) ) {
                            root.pop();
                        } else {
                            root.push( tempPath );
                        }
                    }

                }


            }

            var currentPath = document.getElementsByTagName('script');

            currentPath = currentPath[ currentPath.length -1 ].src;

            return new PathStack().push( currentPath ) + "";


        })();

    /**
     * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
     */
    window.UEDITOR_CONFIG = {

        UEDITOR_HOME_URL: /ueditor/

        // 服务器统一请求接口路径
        , serverUrl: "/article/editor/action"
        ,compressSide:0                            //等比压缩的基准，确定maxImageSideLength参数的参照对象。0为按照最长边，1为按照宽度，2为按照高度
        ,maxImageSideLength:30                    //上传图片最大允许的边长，超过会自动等比缩放,不缩放就设置一个比较大的值，更多设置在image.html中
        , toolbars:[
            [
                //'fullscreen',
                //'source',
                //'|',
                'undo',
                'redo',
                'removeformat',
                'bold',
                'italic',
                'underline',
                'blockquote',
                '|',
                'forecolor',
                'backcolor',
                'insertorderedlist',
                'insertunorderedlist',
                '|',
                'paragraph',
                'fontfamily',
                'fontsize',
                '|',
                'justifyleft',
                'justifycenter',
                'justifyright',
                '|',
                'rowspacingtop',
                'rowspacingbottom',
                'lineheight',
                '|',
                'simpleupload',
                //'insertimage',
                'preview'
                //'emotion',
                //'insertvideo',
                //'music',
                //'insertcode',
                //'horizontal',
                //'inserttable',
                //'|',
                //'help'
            ]
        ]
        ,labelMap:{
            'anchor':'', 'undo':''
        }
        ,'fontsize':[10, 11, 12, 14, 16, 18, 20, 24]

        ,contextMenu:[]

        ,highlightJsUrl:URL + "third-party/SyntaxHighlighter/shCore.js"
        ,highlightCssUrl:URL + "third-party/SyntaxHighlighter/shCoreDefault.css"

        ,autoHeightEnabled:false
        ,initialFrameHeight:300
        ,scaleEnabled:false
        ,zIndex:1
        ,autoFloatEnabled:false
    };
})();
