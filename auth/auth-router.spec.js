const db = require('../database/dbConfig');
const Users = require('./auth-model');

describe('auth model', () => {
    describe('add()', () => {
        beforeEach(async () => {
            await db('users').truncate();
        })

        it('should add 2 users', async () => {
            await Users.add({ username: 'Cory', password: 'iLoveLambda' });
            await Users.add({ username: 'Lizzy', password: 'Lambda4Life' });

            const users = await db('users');
            expect(users).toHaveLength(2);
        })
    })

    describe('find()', () => {
        it('should return a list of users', async () => {
            const users = await Users.find();
            expect(users).toHaveLength(2);
        })
    })

    describe('findBy()', () => {
        it('should return a user', async () => {
            const user = await Users.findBy({ username: 'Cory' });
            expect(user).toHaveLength(1);
        })
    })

    describe('findById()', () => {
        it('should return a user with a specific id', async () => {
            const user = await Users.findById(2);
            expect(user).toEqual({ id: 2, username: 'Lizzy', password: 'Lambda4Life' });
        })
    })
})