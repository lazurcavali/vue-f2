import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';

class PostService {
    // GET posts
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post
                    }))
                );
            } catch(err) {
                reject(err);
            }
        });
    }
    // CREATE posts
    static insertPost(text) {
        return axios.post(url, {
            text,
            isCheckd: false
        });
    }

    // DELETE posts
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }

    // UPDATE posts
    static updatePost(id, isChecked, text) {
        return axios.put(`${url}${id}`, {
            isChecked: isChecked,
            text: text
        });
    }
}

export default PostService;