import ReactDOM from 'react-dom'


export const createContainer = () => {
    const container = document.createElement('div');

    return {
        renderform: component => ReactDOM.render(component, container),
        container
    }
}