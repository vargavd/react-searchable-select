import React from 'react';

import '../styles/rs-select.css';

class RSSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: true,
            filterText: '',
            filteredOptionList: props.options,
            selectedItems: []
        };
    }

    // REACT LIFECYCLE METHODS
    componentDidMount() {
        document.addEventListener('mousedown', this.mouseClickedSomewhere);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.mouseClickedSomewhere);
    }

    // EVENTS
    clickOnButton = (e) => {
        e.stopPropagation();

        this.setState({
            opened: !this.state.opened
        });
    }
    filteInputKeyDown = (e) =>  {
        // ESCAPE
        if (e.which === 27) {
            this.setState({
                opened: false
            });
            return;
        }
    }
    filterChanged = (input) => {
        this.setState({
            filterText: input.target.value,
            filteredOptionList: this.props.options.filter(option => option.toLowerCase().indexOf(input.target.value.toLowerCase()) !== -1)
        });
    }
    mouseClickedSomewhere = (event) => {
        if (this.componentWrapper && !this.componentWrapper.contains(event.target)) {
            this.setState({
                opened: false
            });
        }
    }
    clickOnListElem = (event) => {
        event.target.classList.toggle('selected');

        let selectedItems = [...this.state.selectedItems, event.target.innerText];

        if (event.target.className !== 'selected') {
            selectedItems = this.state.selectedItems.filter(item => event.target.innerText!== item);
        }

        this.setState({ 
            selectedItems: selectedItems,
            opened: false
        }, () => {
            this.props.selectionChanged(this.state.selectedItems);
        });

    }

    // MISC
    getComponentWrapper = (elem) => {
        this.componentWrapper = elem;
    }

    // RENDER METHODS
    render() {
        return (
            <div ref={this.getComponentWrapper} className={"rs-select-component " + (this.state.opened ? 'opened' : '')}>
                <button className="rs-select-button" onClick={this.clickOnButton}>
                    <label className="rs-select-title">
                        Country
                    </label>
                    <div className="rs-select-numbers-and-arrow">
                        <span className="rs-select-items-number">{ this.state.selectedItems.length > 0 ? this.state.selectedItems.length : '' }</span>
                        <span className="rs-select-arrow"></span>
                    </div>
                </button>
                <div className="rs-select-dropdown">
                    <div className="rs-select-input-wrapper">
                        <input className="form-control" placeholder="Type State/Entity" value={this.state.filterText} onKeyDown={this.filteInputKeyDown} onChange={this.filterChanged}/>
                    </div>
                    <div className="rs-select-list-wrapper">
                        <ul className="rs-select-list">
                            { this.state.filteredOptionList.map((optionText) => (
                                <li key={optionText} onClick={ this.clickOnListElem }>{optionText}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default RSSelect;