import reducer from './auth';
import * as actionType from '../Action/actionType'
describe('Auth Reducer',()=>{
    it('should return the initial state',()=>{
        expect(reducer(undefined,{})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })
    it('should store the token upon login',()=>{
        expect(reducer({//initial value
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        },{//from where the values should come
            type: actionType.AUTH_SUCCESS,
            idToken: 'Some-Value',
            userId: 'some-Value'
        })).toEqual({
            token: 'Some-Value',
            userId: 'some-Value',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
});