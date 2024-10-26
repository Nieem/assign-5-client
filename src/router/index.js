export const ROUTES={
    HOME:"/",
    PRODUCTS:"/books",
    SINGLE_PRODUCTS:{
        STATIC:"/books/:bookId",
        DYNAMIC:(bookId)=>`/books/${bookId}`,
    },
    
};