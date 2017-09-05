
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProgressBar from '../src';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var Demo3 = require("./demolist/Demo3");var Demo4 = require("./demolist/Demo4");var DemoArray = [{"example":<Demo1 />,"title":" 基本样式展示","code":"/**\n * @title 基本样式展示\n * @description now 控制实际进度\n */\n\nimport React, { Component } from 'react';\nimport ProgressBar from 'tinper-bee';\n\nclass Demo1 extends Component {\n\n\trender () {\n\t\treturn (\n\t\t\t<ProgressBar style={{width:30}} now = {40} />\n\t\t)\n\t}\n}\n\n\n","desc":" now 控制实际进度"},{"example":<Demo2 />,"title":" 激活状态 ProgressBar","code":"/**\n * @title 激活状态 ProgressBar\n * @description 添加参数active,具备动画。\n */\n\nimport React, { Component } from 'react';\nimport ProgressBar from 'tinper-bee';\n\nclass Demo2 extends Component {\n\trender(){\n\t\treturn (\n\t\t\t<ProgressBar active now = {40} />\n\t\t)\n\t}\n}\n\n","desc":" 添加参数active,具备动画。"},{"example":<Demo3 />,"title":" 进度条组合","code":"/**\n * @title 进度条组合\n * @description 多种状态或者背景的进度条组合成一条。`size`控制大小。\n */\n\nimport React, { Component } from 'react';\nimport ProgressBar from 'tinper-bee';\n\nclass Demo3 extends Component {\n\trender () {\n\t\treturn (\n\t\t\t<ProgressBar size=\"sm\">\n\t\t\t\t<ProgressBar colors=\"danger\" now = {10} />\n\t\t\t\t<ProgressBar colors=\"success\" now = {20} />\n\t\t\t\t<ProgressBar colors=\"warning\" now = {30} />\n\t\t\t</ProgressBar>\t\n\t\t)\n\t}\n}\n\n","desc":" 多种状态或者背景的进度条组合成一条。`size`控制大小。"},{"example":<Demo4 />,"title":" 带label ProgressBar","code":"/**\n * @title 带label ProgressBar\n * @description\n */\n\nimport React, { Component } from 'react';\nimport ProgressBar from 'tinper-bee';\n\nclass Demo4 extends Component {\n\trender(){\n\t\tlet now = 40;\n\t\treturn (\n\t\t\t<div>\n\t\t\t\t<ProgressBar active now = {now} label={`${now}%`} ></ProgressBar>\n\t\t\t\t<ProgressBar size=\"sm\" active now = {now} label={`${now}%`} ></ProgressBar>\n\t\t\t\t<ProgressBar size=\"xs\" active now = {now} label={`${now}%`} ></ProgressBar>\n\t\t\t</div>\n\t\t)\n\t}\n}\n\n","desc":""}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        return (
            <Col md={12}>
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible expanded={ this.state.open } colors='bordered' header={ example } footer={footer} footerStyle = {{padding: 0,borderColor: "transparent"}} >
                    <pre><code className="hljs javascript">{ code }</code></pre>
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
