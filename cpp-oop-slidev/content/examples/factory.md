```cpp
std::unique_ptr<Robot> makeRobot(bool hero) {
    if (hero)
        return std::make_unique<HeroRobot>();
    return std::make_unique<InfantryRobot>();
}
auto robot = makeRobot(true);
robot->attack();
```
