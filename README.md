# vuejs-tutorial

## 1) Vue setup

### Install CLI
```
npm install -g @vue/cli
```

### Create project
```
vue create <project_name>
```

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

## 2) Vue-router setup

### Install vue-router(3.x)
```
npm install vue-router
```
- need to add <router-view /> in app.vue for access routes

## 2) Vuetify setup

### Install Vuetify
```
vue add vuetify
```

###this commit includes

1) made component named TABLE inwhich shows user list from *sample>data.js*
2) added action option for edit and delete
3) created new component for FORM and used in TABLE component
4) show that form in dialog in TABLE component
5) using *computed* feature form title shows with selected option
6) with *watch* dialog open and close
7) after adding new user data from FORM component will pass to TABLE component with *emit feature*

computed: add variable without including in DATA

watch: continues checks value change of any variable 

$emit: used when imported/child component wants to pass data to the parent component

