
export default {

    setLoginUser: function (data) {
        localStorage.setItem('user', JSON.stringify(data))
    },
    getLoginUser: function () {
        return JSON.parse(localStorage.getItem('user'))
    },
    setLocalArticle: function (data) {

        localStorage.setItem('article', JSON.stringify(data))
    },
    getLocalArticle: function () {

        return JSON.parse(localStorage.getItem('article'))
    },
    setLocalNotes: function (data) {

        localStorage.setItem('notes', JSON.stringify(data))
    },
    getLocalNotes: function () {

        return JSON.parse(localStorage.getItem('notes'))
    },
    getRandomColor : function(){
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

}
