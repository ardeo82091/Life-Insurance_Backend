class Query{
    constructor(title,message,reply)
    {
        this.title   =  title;
        this.message =  message;
        this.date    =  new Date();
        this.reply   =  reply;
    }
}

module.exports = Query;