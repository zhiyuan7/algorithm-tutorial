```cpp
struct Robot {
    Robot() = default;
    explicit Robot(int id) { /* ... */ }
};
struct Task {
    Task() = delete;
    explicit Task(int id) { /* ... */ }
};
```
