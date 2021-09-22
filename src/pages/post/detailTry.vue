<template>
  <v-container>
    <v-row>
      <v-col md="12">
        <v-row>
          <v-col md="12">Title</v-col>
        </v-row>
        <v-row>
          <v-col md="12"
            >TLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            pulvinar risus quis mauris interdum, in euismod nibh pretium. Etiam
            pulvinar tincidunt dapibus. Quisque sollicitudin, mauris a consequat
            consectetur, turpis nisl sollicitudin enim, id consectetur neque
            neque nec metus. Pellentesque dolor nisi, vulputate quis lobortis
            ac, tincidunt et quam. Mauris pulvinar blandit nisi nec mattis.
            Aliquam accumsan ut sem eget efficitur. Vivamus in tortor gravida
            eros laoreet condimentum nec vel dui. Nullam quam massa, ultrices
            eget tincidunt a, pulvinar ac libero.</v-col
          >
        </v-row>
        <v-row>
          <v-col md="12">
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <form>
                <ValidationProvider
                  name="comment"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    label="Comment"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>

                <v-btn :disabled="invalid"> post </v-btn>
              </form>
            </ValidationObserver>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="1">
            <v-avatar>
              <v-img
                class="elevation-6"
                alt=""
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <v-row>Evan You</v-row>
            <v-row>dfgdggd</v-row>
            <v-row>dfgd dfgd dfgdf</v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>


