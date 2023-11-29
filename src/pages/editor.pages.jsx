import { createContext, useContext, useState } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom"
import BlogEditor from "../components/Editor/blog-editor.component";
import PublishForm from "../components/Editor/publish-form.component";

const blogStructure = {
    title: '',
    banner: '',
    content: [],
    tags: [],
    des: '',
    author: { personal_info : {}}
}

//todo : สร้าง context สำหรับหน้า editor ว่าเปลี่ยนเป็น editor หรือ publish ค่า default คือ editor
export const EditorContext = createContext({});

const Editor = () => {

    const [blog , setBlog] = useState(blogStructure);
    const {userAuth , setUserAuth } = useContext(UserContext);
    const [editorState , setEditorState] = useState("editor");
    const [textEditor , setTextEditor] = useState({isReady : false});

    return (
        <EditorContext.Provider value={{blog,setBlog,editorState , setEditorState , textEditor ,setTextEditor }}>
            {
                userAuth?.access_token === null ? <Navigate to='/signin' /> 
                : editorState === 'editor' ? <BlogEditor /> : <PublishForm />
            }
        </EditorContext.Provider>
    )
}

export default Editor;