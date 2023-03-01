<template>
  <v-card>
    <CommentInput :listingId="listing.listingId" :root="true"/>
    <div
      v-for="(comment, i) in listing.reviews"
      :key="i">
      <Comment :comment="comment.addRootFlag"/>
    </div>
  </v-card>
</template>
<script>
  export default {
    props: {
      listing: {
          type: Object
      },
    },
    data: () => ({
    }),
    methods: {
      updateShowComments: function(flag){
        this.comment.showComments = flag
      },
      addRootFlag: function(){
        this.comment.root = true
      }
    }
    
  }
</script>