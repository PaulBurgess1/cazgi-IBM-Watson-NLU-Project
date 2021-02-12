import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    
    render() {
        let ctr = 0;
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
            //Table Building 
            Object.entries(this.props.emotions).map((emotion) => {
                        return <tr key={ctr++}>
                            <td key={ctr++}>{emotion[0]}</td>
                            <td key={ctr++}>{emotion[1]}</td>
                            </tr>
                    })

            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
