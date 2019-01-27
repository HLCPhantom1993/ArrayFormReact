"use strict";

/* 声明app应用object */
var app = {
    title: "React Form and array demo",
    /* 数组声明当前app的种类 */
    categories: []

    /* 声明removeAll函数置空种类数组并委托renderApp函数
     * 对DOM原素进行更新 
     */
};var removeAll = function removeAll() {
    app.categories = [];
    renderApp();
};

/**
 * 声明submit函数处理用户点击提交按钮事件
 */
var submit = function submit(e) {
    /* 防止倾听者通过默认方法处理绑定的事件而是通过自定
     * 义的方法处理事件, 比如提交表单时系统默认处理方式
     * 为提交但是通过防止该事件的发生倾听者可以通过自定
     * 义的方式处理, 比如call custom()方法 
     */
    e.preventDefault();
    /* 得到事件绑定的目标元素的数据 */
    var data = e.target.elements.data.value;
    /* 如果事件绑定的原始输入数据有效更新数据数组并委托
     * renderApp函数更新页面 
     */
    if (data) {
        console.log("用户输入的数据是: " + data);
        app.categories.push(data);
        /* 点击事件完毕后清空绑定事件的输入数据 */
        e.target.elements.data.value = '';
        renderApp();
    }
};

/* 找到页面更新DOM原始的注入口 */
var appRoot = document.getElementById("app");
/* 定义DOM模版需要插入的新元素 */
var renderApp = function renderApp() {
    /* 表达式函数更新页面 */
    var template =
    /* form表单通过定义按钮元素及onSubmit事件将用户输入数据通过submit函数render到页
     * 面上
     */
    React.createElement(
        "div",
        null,
        React.createElement(
            "h2",
            null,
            app.title
        ),
        React.createElement(
            "p",
            null,
            app.categories.length > 0 ? 'Categories: ' : 'No Category'
        ),
        React.createElement(
            "ol",
            null,

            /* JS函数map迭代数组元素, 将每个数组元素category输出到listDOM元素上 */
            app.categories.map(function (category) {
                return (
                    /* 对每个数组元素设置一个独一无二的key以便React可以得知每个数组元
                     * 素的数据变化
                     */
                    React.createElement(
                        "li",
                        { key: category },
                        category
                    )
                );
            })
        ),
        React.createElement(
            "form",
            { onSubmit: submit },
            React.createElement("input", { type: "text", name: "data" }),
            React.createElement(
                "button",
                null,
                "add"
            )
        ),
        React.createElement("br", null),
        React.createElement(
            "button",
            { onClick: removeAll },
            "Remove All"
        )
    )
    /* 将removeAll倾听者注册到onClick事件并实时更新隐藏数据及页面内容 */
    ;

    /* 通过ReactDOM将模版元素渲染到DOM元素入口 */
    ReactDOM.render(template, appRoot);
};

/* 程序应用驱动口 */
renderApp();
