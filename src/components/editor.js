import React, {useState} from 'react'
/*import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import {Controlled as ControlledEditor} from 'react-codemirror2'*/
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCompressAlt, faExpandAlt} from '@fortawesome/free-solid-svg-icons'
export default function Editor(props) {
  const {
    displayName,
    language,
    value,
    onChange
  }=props
  const [open,setOpen]=useState(true)
  const getLanguageExtension = () => {
    switch (language) {
      case 'javascript':
        return [javascript()];
      case 'css':
        return [css()];
      case 'xml': // For HTML
        return [html()];
      default:
        return [];
    }
  };
  /*const extensions = {
    javascript: [javascript()],
    css: [css()],
    xml: [html()],
  }[language];*/
  /*function handleChange(Editor,data,value){
    onChange(value)
  }*/
  return (
    <div className = {`editor-container ${open?'' :'collapsed' }`}>
      <div className='editor-title'>
        {displayName}
        <button type='button' className='expand-collapse-btn' onClick={()=>setOpen(prevOpen=>!prevOpen)}>
          <FontAwesomeIcon icon={open? faCompressAlt : faExpandAlt}/>
        </button>
      </div>
      <CodeMirror
        /*onChange={handleChange}
        //onChange={onChange}
        value={value}
        className='code-mirror-wrapper'
        options={{
          linewrapping:true,
          lint: true,
          mode: language,
          theme:'material',
          lineNumbers:true
        }}*/
       value={value}
        height="100%"
        extensions={getLanguageExtension()}
        onChange={onChange}
        theme="dark"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          bracketMatching: true,
        }}
      />
    </div>
  )
}


