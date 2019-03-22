# Third Ear - We Listen for You

*by [Chloe Lin](https://github.com/chloewlin) and [Hongbo Miao](https://github.com/hongbo-miao) at SF Hacks 2019*

An app for deaf students to learn better in class.

https://devpost.com/software/third-ear

![image](https://user-images.githubusercontent.com/3375461/53700590-cb880580-3da8-11e9-9561-f7eed8f3bc04.png)

---

### The Remaining Engineering Part

Due to time limitation, these things are not completed during Hackathon.

- Google sign in and sign out was supposed to be handled by redux-observable in epic too, but met a [weird issue](https://stackoverflow.com/questions/54967343/how-to-avoid-running-function-inside-of-epic-when-combineepics).

- Translation is currently using GraphQL mutation. However, it makes more sense to use GraphQL query because nothing changed in the database.
