import React, {Component} from 'react'

class OtherInfo extends Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return(
            <div className={this.props.className}>
                {
                    this.getParagraphArray()
                }
            </div>
        )
    }

    /**
     * Create an array of paragraph elements representing each addditional piece of information
     */
    getParagraphArray()
    {
        var paragraphArray = []
        for(var i in this.props.info)
        {
            paragraphArray.push(<p key={i}>{this.props.info[i]}</p>)
            paragraphArray.push(<br></br>)
        }

        return paragraphArray
    }
    
}

export default OtherInfo
