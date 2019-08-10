import React from 'react';
export default function asyncComponent(importComponent) {
    class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            };
        }
        componentWillMount() {
            importComponent().then(mod => {
                this.setState({
                    component: mod.default ? mod.default : mod
                });
            });
        }
        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
    return AsyncComponent;
}