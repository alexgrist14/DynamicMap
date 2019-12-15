import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { connect } from 'react-redux';
import Sign from './SignIn';

class Main extends Component<{}, { coords: any, js: any }> {

    constructor(props: any) {
        super(props);
        this.state = { coords: [35.6895000, 139.6917100], js: require('../api/endpoint/coords.json') };
        this.changeCoords = this.changeCoords.bind(this);
        this.authorization = this.authorization.bind(this);
    }

    componentDidMount() {
        //check every 3 second file 
        setInterval(() => { this.setState({ js: require('../api/endpoint/coords.json') }) }, 3000);
        //change map position on click
        const btn: any = document.querySelectorAll('.btn');
        btn.forEach((elem: any, index: any) => elem.addEventListener('click', () => {
            this.changeCoords(index);
        }));

        //show authorization page
        const signIn: any = document.getElementById('sign-in');
        signIn.addEventListener('click', () => {
            document.getElementById('auth')!.style.visibility = 'visible';

        })

        this.authorization();
    }


    changeCoords(i: number) {

        let arr = this.state.js[i].coodrs.split(',');
        let res = arr.map(function (num: any, index: number, arr: any) {
            return Number(arr[index]);
        });
        this.setState({ coords: res });


    }

    //compares email and password
    authorization() {
        //file with data users
        const user: any = require('../accounts/users.json');

        const form: any = document.getElementById('form');
        form.addEventListener('submit', function (event: any) {
            const email: any = document.getElementById('email');
            const password: any = document.getElementById('password');

            if (email.value !== user.email || password.value !== user.password) {

                event.preventDefault();
                alert("Email or password not correct.");
            }
            else {
                alert(`Welcome! ${user.email}`);
            }

        })
    }


    render() {
        return (
            <div>
                <div className="map">
                    <YMaps >
                        <Map defaultState={{ center: this.state.coords, zoom: 15 }} state={{ center: this.state.coords, zoom: 15 }} width={'50vw'} height={'90vh'}>
                            <Placemark geometry={this.state.coords} />
                        </Map>
                    </YMaps>
                </div>
                <Sign />
                <div className="cards-container">
                    <div className="cards">

                        {
                            this.state.js.map(function (num: any, index: number, arr: any) {

                                return (
                                    <div key={index} className="btn grey"  >
                                        <p> {arr[index].name}</p>
                                        <p>{arr[index].coodrs} </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }


}
const mapStateToProps = (state: any) => {
    return {
        posts: state.posts
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        update: (coords: any) => { dispatch({ type: 'ADD_TODO', coords: coords }) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
