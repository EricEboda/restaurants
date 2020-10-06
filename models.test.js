const {Restaurant, sequelize, Menu} = require('./models')

beforeAll(async () => {
    await sequelize.sync()
})

describe('Restaurant', () => {
    test('when a restaurant is created it is added to the database', async () => {
        const restaurant = await Restaurant.create({name: "Nando's", image: "https://www.thesun.co.uk/wp-content/uploads/2019/09/M_LUN_FilletRiceSpinachSM_7_1.jpg"})
        expect(restaurant.id).toBeTruthy()
        expect(restaurant.createdAt).toBeTruthy()
    })
    test('can add a menu to a restaurant', async () => {
        const restaurant = await Restaurant.create({name: "Hakkasan", image: "https://www.avenuecalgary.com/wp-content/uploads/2020/04/BVREasterDelivery-960x640.jpg"})
        const menu = await Menu.create({title: "Lunch Menu"})
        await restaurant.addMenu(menu)
        const menus = await restaurant.getMenus()
        expect(menus.length).toBe(1)
    })
})
