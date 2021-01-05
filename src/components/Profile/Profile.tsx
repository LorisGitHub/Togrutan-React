import React, {useEffect} from 'react';
import './Profile.css';
import { PieChart } from 'react-minimal-pie-chart';

export default function Profile (props){
    const [watchedNumber, setWatchedNumber] = React.useState(0);
    const [planToNumber, setPlanToNumber] = React.useState(0);
    const [droppedNumber, setDroppedNumber] = React.useState(0);

    useEffect(() => {
        if(props.currentUser){
            if(props.currentUser.viewed){
                setWatchedNumber(props.currentUser.viewed.length);
            }
            if(props.currentUser.planToWatch){
                setPlanToNumber(props.currentUser.planToWatch.length);
            }
            if(props.currentUser.dropped){
                setDroppedNumber(props.currentUser.dropped.length);
            }
        }
    }, []);

    return (
        <div style={{ margin: '30px'}}>
            {props.currentUser ?
                <div>
                    <h3>Welcome {props.currentUser.username} {process.env.REACT_APP_MEDIAS_URL}</h3>
                    <PieChart
                        style={{ width: 200}}
                        animate={true}
                        data={[
                            { title: 'Watched', value: 10, color: '#E38627' },
                            { title: 'Plan to Watch', value: 2, color: '#C13C37' },
                            { title: 'Dropped', value: 3, color: '#6A2135' },
                        ]}
                    />
                </div>
            : null}
        </div>
    );
}
