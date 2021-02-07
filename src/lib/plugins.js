import request from './request-lib';
import jwt from 'hapi-auth-jwt2';

const plugins = [request, jwt];

export default plugins;
