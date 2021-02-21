import React from 'react'

export default class NodeLabel extends React.PureComponent {
    render() {
        const { className, nodeData } = this.props
        return (
            <div className={`${className} hover`} style={{textAlign: "center", color: '#fff', background: 'rgba(0, 0, 0, 0.5)'}}>{nodeData.name}</div>
        )
    }
}
