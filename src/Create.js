import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("mario");
    const [isPending, setIsPending] = useState(false);

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new-blog is added')
            setIsPending(false)
            history.push('/');

        })
    }

    return ( 
        <div className="create">
            <h2> Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Blog body</label>
                <textarea
                    required
                    onChange={(e) => setBody(e.target.value)}
                />

                <label>Blog author:</label>
                <select 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}>
                    <option value="Abdul">Abdul</option>
                    <option value="Peter">Peter</option>
                </select>
                { !isPending && <button>Add a blog</button> }
                { isPending && <button disabled>Adding...</button> }
                
            </form>
        </div>
     );
}
 
export default Create;