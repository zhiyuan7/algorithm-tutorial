```cpp
void run(bool stop) {
    Robot* p = new Robot(7);
    if (stop) return;  // 漏掉了 delete
    use(*p);           // 若抛异常也会遗漏
    delete p;
}
```
