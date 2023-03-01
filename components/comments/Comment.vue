<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col cols="1">
                    <v-avatar>{{comment.author}}</v-avatar>
                </v-col>
            <v-col>
                <v-card-title>{{comment.Author}}</v-card-title>
                <v-card-subtitle
                    v-if="comment.root"
                >
                    <v-row v-if="comment.ratings">
                        <v-col
                            v-for="(rating, i) in comment.ratings"
                            :key="i"
                        >
                            {{rating.key}}{{rating.value}}{{rating}}
                            <v-rating
                                half-increments
                                length="5"
                                readonly
                                :value="rating"
                            ></v-rating>
                        </v-col>
                    </v-row>
                </v-card-subtitle>
                <v-card-text>
                    {{comment}}
                </v-card-text>
            </v-col>
        </v-row>
        <v-row>
       <!--     <v-col cols="3">
                helpful?
                <v-btn @click="addToHelpfulYes">Y</v-btn>
                <v-btn @click="addToHelpfulTotal">n</v-btn>
            </v-col> -->
            <v-col>
             <!--   {{comment.helpful.yes}}/{{comment.helpful.total}}  People Found this helpful -->
            </v-col>
            <v-col v-if="comment.root">
                <v-btn @click="toggleShowCommentInput">Comment {{showCommentInput}}</v-btn>
            </v-col>
            <v-col v-if="comment.root">
                <v-btn @click="toggleShowComments">View Comments {{comment.comments ? comment.comments.length : 0}} {{comment.showComments}}</v-btn>
            </v-col>
          <!--  <v-col v-if="comment.author_email === $auth.user.email">
                <v-btn @click="editComment">edit</v-btn>
            </v-col> -->
        </v-row>
        </v-card>
        <v-card v-if="showCommentInput">
            <div v-if="comment.reviewId">
                <CommentInput :reviewId="comment.reviewId" />
            </div>
            <div v-else>ERROR</div>
        </v-card>
        <template v-if="comment.comments">
            <v-card v-if="comment.showComments">
                <div
                    v-for="(subComment, j) in reviews.comments"
                    :key="j">
                    <Comment :comment="subComment"/>
                </div>
            </v-card>
        </template>
    </v-container>
</template>
<script>

export default ({
    name: "Comment",
     data: () => ({
         showCommentInput: false,
         showComments: false
     }),
    props:{
        comment: {
            type: Object
        }
    },
    methods: {
        toggleShowComments: function(){
            this.showComments = !this.showComments
        },
        toggleShowCommentInput: function(){
            this.showCommentInput = !this.showCommentInput
        },
        addToHelpfulYes: function(){
            //this.comment.helpful.yes++
            //this.addToHelpfulTotal()
        },
        addToHelpfulTotal: function(){
            //this.comment.helpful.total++
        },
        editComment: function(){
            console.log('edit')
        }
    }
})
</script>
