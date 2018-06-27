import user from './allApi/user';
import article from './allApi/article';
import notes from './allApi/notes';


let allApi = Object.assign(
    user,
    article,
    notes
);

export default allApi;
