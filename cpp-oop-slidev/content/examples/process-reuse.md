```cpp
bool withdraw(int amount) {
    if (amount <= 0 || amount > balance)
        return false;
    balance -= amount;
    return true;
}
```
