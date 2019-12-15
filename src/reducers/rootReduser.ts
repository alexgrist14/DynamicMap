const initState = {
    posts: [
        { coords: [30, 37.57] },
        { coords: [16, 22] }
    ]
}

const rootReducer = (state: any = initState, action: any) => {
    switch (action.type) {
        case 'ADD_TODO':
            console.log(action);
            return [
                ...state,
                {
                    coords: action.coords
                }
            ]
        default:
            return state;
    }


}

export default rootReducer
