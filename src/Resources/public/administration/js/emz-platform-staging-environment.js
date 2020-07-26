(this.webpackJsonp=this.webpackJsonp||[]).push([["emz-platform-staging-environment"],{"24Ln":function(e){e.exports=JSON.parse('{"emz-staging-environment":{"general":{"mainMenuItemGeneral":"Staging environments","mainMenuItemEnvironments":"Environments","mainMenuItemLogs":"Logs","mainMenuItemProfiles":"Profiles","descriptionTextModule":"Manage your staging environments here"},"list":{"columnProfileName":"Name","columnEnvironmentName":"Name","columnComment":"Comment","columnAccessLinks":"Access","addButtonText":"Create profile","addEnvironmentButton":"Create new staging environment"},"detail":{"title":"Staging environment","name":"Name","environmentCardTitle":"Environment","errorTitle":"Error saving the profile","cancelButtonText":"Cancel","saveButtonText":"Save","profileCardTitle":"Profile","databaseCardTitle":"Database","settingsCardTitle":"Settings","profileNameLabel":"Profile name","folderNameLabel":"Directory name","excludedFoldersLabel":"Excluded directories","excludedFoldersHelpText":"Please add comma separated, e.g. media, documents/files, my/private/folder","commentLabel":"Comment","databaseHostLabel":"Database host","databaseUserLabel":"Database user","databaseNameLabel":"Database name","databasePasswordLabel":"Database password","databasePortLabel":"Database port","anonymizeDataLabel":"Anonymize data","deactivateScheduledTasksLabel":"Deactivate scheduled tasks","setInMaintenanceLabel":"Set in maintenance"},"create":{"title":"New staging environment","name":"Name","start":"Start","processStarted":"Process started!","success":"Environment created successfully!","error":"Error occured. Environment was not created!","stepsTitle":"Synchronization","syncFiles":"Copy files","syncDatabase":"Clone database","updateEnv":"Update settings","prepare":"Preparation","stepsContent":{"preparation":"In the preparation step the system proves if everything is correct to create a new staging environment.","syncFiles":"In this step all files will be copied in the appropriate sub folder, so that Shopware 6 has everything it needs to run smoothly.","cloneDatabase":"The database is a crucial part of a running system. All tables will be cloned and filled with the content of the main system.","updateSettings":"At the end some settings needs to be updated on the lately created staging database.","finished":"Congratulations! Your staging environemnt is up and running!"}}}}')},B7z1:function(e,t){e.exports='{% block emz_staging_environment_detail %}\n    <sw-page class="emz-staging-environment-detail">\n        <template slot="smart-bar-header">\n            <h2>\n                {{ $t(\'emz-staging-environment.general.mainMenuItemGeneral\') }}\n                    <sw-icon name="small-arrow-medium-right" small></sw-icon>\n                {{ $t(\'emz-staging-environment.detail.title\') }}\n            </h2>\n        </template>\n\n        <template slot="smart-bar-actions">\n            <sw-button\n                :routerLink="{ name: \'emz.staging.environment.index\' }"\n            >\n                {{ $t(\'emz-staging-environment.detail.cancelButtonText\') }}\n            </sw-button>\n            <sw-button-process\n                variant="primary"\n                @click="onClickSave"\n                :isLoading="isLoading"\n                :processSuccess="processSuccess.createNewStagingEnvironment"\n                @process-finish="resetButton"\n            >\n                {{ $t(\'emz-staging-environment.detail.saveButtonText\') }}\n            </sw-button-process>\n        </template>\n        \n        <template #content>\n            <sw-card-view>\n                <sw-card\n                    v-if="readyToSync"\n                    :title="$t(\'emz-staging-environment.create.stepsTitle\')"\n                >\n                    <sw-container columns="1fr 1fr">\n                        <sw-card-section divider="right">\n                            <sw-step-display :itemIndex="stepIndex"\n                                :itemVariant="stepVariant"\n                                :initialItemVariants="stepInitialItemVariants">\n                                <sw-step-item>\n                                    {{ $t(\'emz-staging-environment.create.prepare\') }}\n                                </sw-step-item>\n                                <sw-step-item>\n                                    {{ $t(\'emz-staging-environment.create.syncFiles\') }}\n                                </sw-step-item>\n                                <sw-step-item>\n                                    {{ $t(\'emz-staging-environment.create.syncDatabase\') }}\n                                </sw-step-item>\n                                <sw-step-item>\n                                    {{ $t(\'emz-staging-environment.create.updateEnv\') }}\n                                </sw-step-item>\n                            </sw-step-display>\n                        </sw-card-section>\n                        <sw-card-section>\n                            <div v-if="processes.createNewStagingEnvironment" class="emz-staging-environment-content-loader">\n                                <sw-loader \n                                    size="50px"\n                                >\n                                </sw-loader>\n                            </div>\n                            <p>{{stepContent}}</p>\n                        </sw-card-section>\n                    </sw-container>\n\n                    <sw-container columns="1fr 1fr">\n                        <sw-card-section divider="right">\n                            <sw-label variant="success" size="default" appearance="default" :caps="true">\n                                <strong>Last sync was:</strong> 01.01.1970 08:08\n                            </sw-label>\n                        </sw-card-section>\n                        <sw-card-section class="text-right">\n                            <sw-button-process variant="ghost"\n                                :isLoading="processes.createNewStagingEnvironment"\n                                :processSuccess="processSuccess.createNewStagingEnvironment"\n                                @process-finish="resetButton"\n                                @click="createNewStatingEnvironment"\n                            >\n                                {{ $t(\'emz-staging-environment.create.start\') }}\n                            </sw-button-process>\n                        </sw-card-section>\n                    </sw-container>\n                </sw-card>\n                \n                <sw-card\n                    v-if="environment"\n                    :title="$t(\'emz-staging-environment.detail.environmentCardTitle\')"\n                >\n                    <sw-container columns="1fr 1fr" gap="32px">\n                        <sw-text-field\n                            :label="$t(\'emz-staging-environment.detail.name\')"\n                            :placeholder="$t(\'emz-staging-environment.detail.name\')"\n                            v-model="environment.environmentName"\n                            required\n                        >\n                        </sw-text-field>\n                        \n                        <sw-text-field\n                                :label="$t(\'emz-staging-environment.detail.folderNameLabel\')"\n                                :placeholder="$t(\'emz-staging-environment.detail.folderNameLabel\')"\n                                v-model="environment.folderName"\n                                validation="required"\n                            >\n                        </sw-text-field>\n                    </sw-container>\n\n                    <sw-text-field\n                        :label="$t(\'emz-staging-environment.detail.excludedFoldersLabel\')"\n                        :placeholder="$t(\'emz-staging-environment.detail.excludedFoldersLabel\')"\n                        v-model="environment.excludedFolders"\n                        :helpText="$t(\'emz-staging-environment.detail.excludedFoldersHelpText\')"\n                    >\n                    </sw-text-field>\n\n                    <sw-textarea-field\n                        :label="$t(\'emz-staging-environment.detail.commentLabel\')"\n                        :placeholder="$t(\'emz-staging-environment.detail.commentLabel\')"\n                        v-model="environment.comment"\n                    >\n                    </sw-textarea-field>\n                </sw-card>\n\n                <sw-card\n                    v-if="environment"\n                    :isLoading="isLoading"\n                    :title="$t(\'emz-staging-environment.detail.databaseCardTitle\')"\n                >\n                    <sw-text-field\n                        :label="$t(\'emz-staging-environment.detail.databaseHostLabel\')"\n                        :placeholder="$t(\'emz-staging-environment.detail.databaseHostLabel\')"\n                        v-model="environment.databaseHost"\n                        validation="required"\n                    >\n                    </sw-text-field>\n\n                    <sw-text-field\n                        :label="$t(\'emz-staging-environment.detail.databaseUserLabel\')"\n                        :placeholder="$t(\'emz-staging-environment.detail.databaseUserLabel\')"\n                        v-model="environment.databaseUser"\n                        validation="required"\n                    >\n                    </sw-text-field>\n\n                    <sw-text-field\n                        :label="$t(\'emz-staging-environment.detail.databaseNameLabel\')"\n                        :placeholder="$t(\'emz-staging-environment.detail.databaseNameLabel\')"\n                        v-model="environment.databaseName"\n                        validation="required"\n                    >\n                    </sw-text-field>\n\n                    <sw-password-field\n                        :label="$t(\'emz-staging-environment.detail.databasePasswordLabel\')"\n                        :placeholder="$t(\'emz-staging-environment.detail.databasePasswordLabel\')"\n                        v-model="environment.databasePassword"\n                        validation="required"\n                    >\n                    </sw-password-field>\n\n                    <sw-text-field\n                        :label="$t(\'emz-staging-environment.detail.databasePortLabel\')"\n                        :placeholder="$t(\'emz-staging-environment.detail.databasePortLabel\')"\n                        v-model="environment.databasePort"\n                        validation="required"\n                    >\n                    </sw-text-field>\n                </sw-card>\n\n                <sw-card\n                    v-if="environment"\n                    :isLoading="isLoading"\n                    :title="$t(\'emz-staging-environment.detail.settingsCardTitle\')"\n                >\n                    <sw-checkbox-field\n                        :label="$t(\'emz-staging-environment.detail.anonymizeDataLabel\')"\n                        v-model="environment.anonymizeData"\n                    >\n                    </sw-checkbox-field>\n\n                    <sw-checkbox-field\n                        :label="$t(\'emz-staging-environment.detail.deactivateScheduledTasksLabel\')"\n                        v-model="environment.deactivateScheduledTasks"\n                    >\n                    </sw-checkbox-field>\n\n                    <sw-checkbox-field\n                        :label="$t(\'emz-staging-environment.detail.setInMaintenanceLabel\')"\n                        v-model="environment.setInMaintenance"\n                    >\n                    </sw-checkbox-field>\n                </sw-card>\n\n                {# <sw-card\n                    :title="$t(\'emz-staging-environment.detail.title\')"    \n                >\n                    <sw-entity-single-select\n                        required\n                        entity="emz_pse_profile"\n                        label="Profile"\n                        labelProperty="profileName"\n                        v-model="selectedProfile">\n                    </sw-entity-single-select>\n                </sw-card> #}\n            </sw-card-view>\n        </template>\n    </sw-page>\n{% endblock %}'},CkOj:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n("lSNA"),i=n.n(a),s=n("lO2t"),r=n("lYO9");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e){var t=function(e){var t;if(s.a.isString(e))try{t=JSON.parse(e)}catch(e){return!1}else{if(!s.a.isObject(e)||s.a.isArray(e))return!1;t=e}return t}(e);if(!t)return null;if(!0===t.parsed||!function(e){return void 0!==e.data||void 0!==e.errors||void 0!==e.links||void 0!==e.meta}(t))return t;var n=function(e){var t={links:null,errors:null,data:null,associations:null,aggregations:null};if(e.errors)return t.errors=e.errors,t;var n=function(e){var t=new Map;if(!e||!e.length)return t;return e.forEach((function(e){var n="".concat(e.type,"-").concat(e.id);t.set(n,e)})),t}(e.included);if(s.a.isArray(e.data))t.data=e.data.map((function(e){var a=d(e,n);return Object(r.f)(a,"associationLinks")&&(t.associations=l({},t.associations,{},a.associationLinks),delete a.associationLinks),a}));else if(s.a.isObject(e.data)){var a=d(e.data,n);Object.prototype.hasOwnProperty.call(a,"associationLinks")&&(t.associations=l({},t.associations,{},a.associationLinks),delete a.associationLinks),t.data=a}else t.data=null;e.meta&&Object.keys(e.meta).length&&(t.meta=m(e.meta));e.links&&Object.keys(e.links).length&&(t.links=e.links);e.aggregations&&Object.keys(e.aggregations).length&&(t.aggregations=e.aggregations);return t}(t);return n.parsed=!0,n}function d(e,t){var n={id:e.id,type:e.type,links:e.links||{},meta:e.meta||{}};e.attributes&&Object.keys(e.attributes).length>0&&(n=l({},n,{},m(e.attributes)));if(e.relationships){var a=function(e,t){var n={},a={};return Object.keys(e).forEach((function(i){var r=e[i];if(r.links&&Object.keys(r.links).length&&(a[i]=r.links.related),r.data){var o=r.data;s.a.isArray(o)?n[i]=o.map((function(e){return g(e,t)})):s.a.isObject(o)?n[i]=g(o,t):n[i]=null}})),{mappedRelations:n,associationLinks:a}}(e.relationships,t);n=l({},n,{},a.mappedRelations,{},{associationLinks:a.associationLinks})}return n}function m(e){var t={};return Object.keys(e).forEach((function(n){var a=e[n],i=n.replace(/-([a-z])/g,(function(e,t){return t.toUpperCase()}));t[i]=a})),t}function g(e,t){var n="".concat(e.type,"-").concat(e.id);return t.has(n)?d(t.get(n),t):e}},DNno:function(e,t,n){},HBnn:function(e,t){const{Component:n,Context:a}=Shopware;n.extend("emz-staging-environment-create","emz-staging-environment-detail",{methods:{getEnvironment(){this.environment=this.repositoryEnvironment.create(a.api)},onClickSave(){this.isLoading=!0,this.repositoryEnvironment.save(this.environment,a.api).then(()=>{this.isLoading=!1,this.$router.push({name:"emz.staging.environment.detail",params:{id:this.environment.id}})}).catch(e=>{this.isLoading=!1,this.createNotificationError({title:this.$t("emz-staging-environment.detail.errorTitle"),message:e})})}}})},SJIK:function(e,t,n){var a=n("DNno");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,n("SZ7m").default)("793f0eb0",a,!0,{})},SwLI:function(e,t,n){"use strict";n.r(t);var a=n("lwsE"),i=n.n(a),s=n("W8MJ"),r=n.n(s),o=n("CkOj"),l=function(){function e(t,n,a){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/vnd.api+json";i()(this,e),this.httpClient=t,this.loginService=n,this.apiEndpoint=a,this.contentType=s}return r()(e,[{key:"getList",value:function(t){var n=t.page,a=void 0===n?1:n,i=t.limit,s=void 0===i?25:i,r=t.sortBy,o=t.sortDirection,l=void 0===o?"asc":o,c=t.sortings,d=t.queries,m=t.term,g=t.criteria,u=t.aggregations,p=t.associations,h=t.headers,v=t.versionId,b=t.ids,f=t["total-count-mode"],w=void 0===f?0:f,y=this.getBasicHeaders(h),S={page:a,limit:s};return c?S.sort=c:r&&r.length&&(S.sort=("asc"===l.toLowerCase()?"":"-")+r),b&&(S.ids=b.join("|")),m&&(S.term=m),g&&(S.filter=[g.getQuery()]),u&&(S.aggregations=u),p&&(S.associations=p),v&&(y=Object.assign(y,e.getVersionHeader(v))),d&&(S.query=d),w&&(S["total-count-mode"]=w),S.term&&S.term.length||S.filter&&S.filter.length||S.aggregations||S.sort||S.queries||S.associations?this.httpClient.post("".concat(this.getApiBasePath(null,"search")),S,{headers:y}).then((function(t){return e.handleResponse(t)})):this.httpClient.get(this.getApiBasePath(),{params:S,headers:y}).then((function(t){return e.handleResponse(t)}))}},{key:"getById",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t)return Promise.reject(new Error("Missing required argument: id"));var i=n,s=this.getBasicHeaders(a);return this.httpClient.get(this.getApiBasePath(t),{params:i,headers:s}).then((function(t){return e.handleResponse(t)}))}},{key:"updateById",value:function(t,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if(!t)return Promise.reject(new Error("Missing required argument: id"));var s=a,r=this.getBasicHeaders(i);return this.httpClient.patch(this.getApiBasePath(t),n,{params:s,headers:r}).then((function(t){return e.handleResponse(t)}))}},{key:"deleteAssociation",value:function(e,t,n,a){if(!e||!n||!n)return Promise.reject(new Error("Missing required arguments."));var i=this.getBasicHeaders(a);return this.httpClient.delete("".concat(this.getApiBasePath(e),"/").concat(t,"/").concat(n),{headers:i}).then((function(e){return e.status>=200&&e.status<300?Promise.resolve(e):Promise.reject(e)}))}},{key:"create",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=n,s=this.getBasicHeaders(a);return this.httpClient.post(this.getApiBasePath(),t,{params:i,headers:s}).then((function(t){return e.handleResponse(t)}))}},{key:"delete",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!e)return Promise.reject(new Error("Missing required argument: id"));var a=Object.assign({},t),i=this.getBasicHeaders(n);return this.httpClient.delete(this.getApiBasePath(e),{params:a,headers:i})}},{key:"clone",value:function(t){return t?this.httpClient.post("/_action/clone/".concat(this.apiEndpoint,"/").concat(t),null,{headers:this.getBasicHeaders()}).then((function(t){return e.handleResponse(t)})):Promise.reject(new Error("Missing required argument: id"))}},{key:"versionize",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a="/_action/version/".concat(this.apiEndpoint,"/").concat(e),i=Object.assign({},t),s=this.getBasicHeaders(n);return this.httpClient.post(a,{},{params:i,headers:s})}},{key:"mergeVersion",value:function(t,n,a,i){if(!t)return Promise.reject(new Error("Missing required argument: id"));if(!n)return Promise.reject(new Error("Missing required argument: versionId"));var s=Object.assign({},a),r=Object.assign(e.getVersionHeader(n),this.getBasicHeaders(i)),o="_action/version/merge/".concat(this.apiEndpoint,"/").concat(n);return this.httpClient.post(o,{},{params:s,headers:r})}},{key:"getApiBasePath",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n="";return t&&t.length&&(n+="".concat(t,"/")),e&&e.length>0?"".concat(n).concat(this.apiEndpoint,"/").concat(e):"".concat(n).concat(this.apiEndpoint)}},{key:"getBasicHeaders",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={Accept:this.contentType,Authorization:"Bearer ".concat(this.loginService.getToken()),"Content-Type":"application/json"};return Object.assign({},t,e)}},{key:"apiEndpoint",get:function(){return this.endpoint},set:function(e){this.endpoint=e}},{key:"httpClient",get:function(){return this.client},set:function(e){this.client=e}},{key:"contentType",get:function(){return this.type},set:function(e){this.type=e}}],[{key:"handleResponse",value:function(t){if(null===t.data||void 0===t.data)return t;var n=t.data,a=t.headers;return a&&a["content-type"]&&"application/vnd.api+json"===a["content-type"]&&(n=e.parseJsonApiData(n)),n}},{key:"parseJsonApiData",value:function(e){return Object(o.a)(e)}},{key:"getVersionHeader",value:function(e){return{"sw-version-id":e}}}]),e}();t.default=l},T8cp:function(e,t,n){"use strict";n.r(t);var a=n("vOJG"),i=n.n(a);const{Component:s,Data:r}=Shopware,{Criteria:o}=r;s.register("emz-staging-environment-index",{template:i.a,metaInfo(){return{title:this.$createTitle()}},inject:["repositoryFactory"],data:()=>({repository:null,environments:null,salesChannels:null}),created(){this.repository=this.repositoryFactory.create("emz_pse_environment"),this.repository.search(new o,Shopware.Context.api).then(e=>{this.environments=e}),this.salesChannelRepository=this.repositoryFactory.create("sales_channel"),this.salesChannelRepository.search(new o,Shopware.Context.api).then(e=>{this.salesChannels=e,console.log("this.salesChannels",this.salesChannels.getDomains())})},computed:{columns(){return[{property:"environmentName",dataIndex:"environmentName",label:this.$t("emz-staging-environment.list.columnEnvironmentName"),routerLink:"emz.staging.environment.detail",inlineEdit:"string",allowResize:!0,primary:!0},{property:"comment",dataIndex:"comment",label:this.$t("emz-staging-environment.list.columnComment"),inlineEdit:"string",allowResize:!0},{property:"folderName",dataIndex:"folderName",label:this.$t("emz-staging-environment.list.columnAccessLinks"),inlineEdit:"string",allowResize:!0}]}},methods:{}});var l=n("B7z1"),c=n.n(l);n("SJIK");const{Component:d,Context:m,Data:g,Mixin:u}=Shopware,{Criteria:p}=g;d.register("emz-staging-environment-detail",{template:c.a,mixins:[u.getByName("notification")],inject:["repositoryFactory","stagingEnvironmentApiService"],metaInfo(){return{title:this.$createTitle()}},data:()=>({environment:null,repositoryEnvironment:null,repositoryProfile:null,profiles:null,selectedProfile:null,isLoading:!1,readyToSync:!1,processes:{createNewStagingEnvironment:!1},processSuccess:{createNewStagingEnvironment:!1},stepVariant:"info",currentStep:1}),computed:{stepIndex(){return this.currentStep<1?0:this.currentStep-1},stepInitialItemVariants(){return[["disabled","disabled","disabled","disabled"],["success","disabled","disabled","disabled"],["success","info","disabled","disabled"],["success","success","info","disabled"],["success","success","success","info"],["success","success","success","success"]][this.currentStep]},stepContent(){return["",this.$t("emz-staging-environment.create.stepsContent.preparation"),this.$t("emz-staging-environment.create.stepsContent.syncFiles"),this.$t("emz-staging-environment.create.stepsContent.cloneDatabase"),this.$t("emz-staging-environment.create.stepsContent.updateSettings"),this.$t("emz-staging-environment.create.stepsContent.finished")][this.currentStep]}},created(){this.repositoryEnvironment=this.repositoryFactory.create("emz_pse_environment"),this.getEnvironment()},methods:{getEnvironment(){this.repositoryEnvironment.get(this.$route.params.id,m.api).then(e=>{this.environment=e,this.readyToSync=!0})},onClickSave(){this.repositoryEnvironment.save(this.environment,m.api).then(()=>{this.getEnvironment()}).catch(e=>{this.createNotificationError({title:this.$t("emz-staging-environment.detail.errorTitle"),message:e})})},createNewStatingEnvironment(){return this.createNotificationInfo({title:this.$t("global.default.info"),message:this.$t("emz-staging-environment.create.processStarted")}),this.processes.createNewStagingEnvironment=!0,this.currentStep=2,this.stagingEnvironmentApiService.syncFiles({folderName:this.environment.folderName}).then(()=>{this.createNotificationSuccess({title:this.$t("global.default.success"),message:"Sync files finished"}),this.currentStep++,this.stagingEnvironmentApiService.cloneDatabase({databaseHost:this.environment.databaseHost,databaseUser:this.environment.databaseUser,databaseName:this.environment.databaseName,databasePassword:this.environment.databasePassword,databasePort:this.environment.databasePort}).then(()=>{this.createNotificationSuccess({title:this.$t("global.default.success"),message:"clone database finished"}),this.currentStep++,this.stagingEnvironmentApiService.updateSettings({folderName:this.environment.folderName,databaseHost:this.environment.databaseHost,databaseUser:this.environment.databaseUser,databaseName:this.environment.databaseName,databasePassword:this.environment.databasePassword,databasePort:this.environment.databasePort}).then(()=>{this.processes.createNewStagingEnvironment=!1,this.createNotificationSuccess({title:this.$t("global.default.success"),message:"update settings finished"}),this.currentStep++}).finally(()=>{this.processes.createNewStagingEnvironment=!1,this.currentStep=5})})}).catch(()=>{this.reset(),this.createNotificationError({title:this.$t("global.default.error"),message:this.$t("emz-staging-environment.create.error")})})},resetButton(){this.processSuccess={createNewStagingEnvironment:!1}},reset(){this.processes.createNewStagingEnvironment=!1,this.currentStep=1}}});n("HBnn");var h=n("yCrm"),v=n("24Ln"),b=n("SwLI");class f extends b.default{constructor(e,t,n="environment"){super(e,t,n),this.name="stagingEnvironmentApiService"}syncFiles({folderName:e},t={},n={}){const a=this.getBasicHeaders({}),i={folderName:e};return this.httpClient.post("/_action/emz_pse/environment/sync_files",i,{headers:a})}cloneDatabase({databaseHost:e,databaseUser:t,databaseName:n,databasePassword:a,databasePort:i},s={},r={}){const o=this.getBasicHeaders(),l={databaseHost:e,databaseUser:t,databaseName:n,databasePassword:a,databasePort:i};return this.httpClient.post("/_action/emz_pse/environment/clone_database",l,{headers:o})}updateSettings({folderName:e,databaseHost:t,databaseUser:n,databaseName:a,databasePassword:i,databasePort:s},r={},o={}){const l=this.getBasicHeaders(),c={folderName:e,databaseHost:t,databaseUser:n,databaseName:a,databasePassword:i,databasePort:s};return this.httpClient.post("/_action/emz_pse/environment/update_settings",c,{headers:l})}}var w=f;const{Module:y,Application:S}=Shopware;y.register("emz-staging-environment",{type:"plugin",name:"Staging",title:"emz-staging-environment.general.mainMenuItemGeneral",description:"emz-staging-environment.general.descriptionTextModule",color:"#009bd9",icon:"default-device-server",snippets:{"de-DE":h,"en-GB":v},routes:{index:{component:"emz-staging-environment-index",path:"index"},detail:{component:"emz-staging-environment-detail",path:"detail/:id",meta:{parentPath:"emz.staging.environment.index"}},create:{component:"emz-staging-environment-create",path:"create",meta:{parentPath:"emz.staging.environment.index"}}},navigation:[{id:"emz-staging-environment",label:"emz-staging-environment.general.mainMenuItemGeneral",color:"#009bd9",path:"emz.staging.environment.index",icon:"default-device-server",parent:"sw-catalogue",position:100}]}),S.addServiceProvider("stagingEnvironmentApiService",e=>{const t=S.getContainer("init");return new w(t.httpClient,e.loginService)})},lO2t:function(e,t,n){"use strict";n.d(t,"b",(function(){return N}));var a=n("GoyQ"),i=n.n(a),s=n("YO3V"),r=n.n(s),o=n("E+oP"),l=n.n(o),c=n("wAXd"),d=n.n(c),m=n("Z0cm"),g=n.n(m),u=n("lSCD"),p=n.n(u),h=n("YiAA"),v=n.n(h),b=n("4qC0"),f=n.n(b),w=n("Znm+"),y=n.n(w),S=n("Y+p1"),z=n.n(S),k=n("UB5X"),P=n.n(k);function N(e){return void 0===e}t.a={isObject:i.a,isPlainObject:r.a,isEmpty:l.a,isRegExp:d.a,isArray:g.a,isFunction:p.a,isDate:v.a,isString:f.a,isBoolean:y.a,isEqual:z.a,isNumber:P.a,isUndefined:N}},lYO9:function(e,t,n){"use strict";n.d(t,"g",(function(){return v})),n.d(t,"a",(function(){return b})),n.d(t,"c",(function(){return f})),n.d(t,"h",(function(){return w})),n.d(t,"f",(function(){return y})),n.d(t,"b",(function(){return S})),n.d(t,"e",(function(){return z})),n.d(t,"d",(function(){return k}));var a=n("lSNA"),i=n.n(a),s=n("QkVN"),r=n.n(s),o=n("BkRI"),l=n.n(o),c=n("mwIZ"),d=n.n(c),m=n("D1y2"),g=n.n(m),u=n("lO2t");function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){i()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}r.a,l.a,d.a,g.a;var v=r.a,b=l.a,f=d.a,w=g.a;function y(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return JSON.parse(JSON.stringify(e))}function z(e,t){return e===t?{}:u.a.isObject(e)&&u.a.isObject(t)?u.a.isDate(e)||u.a.isDate(t)?e.valueOf()===t.valueOf()?{}:t:Object.keys(t).reduce((function(n,a){if(!y(e,a))return h({},n,i()({},a,t[a]));if(u.a.isArray(t[a])){var s=k(e[a],t[a]);return Object.keys(s).length>0?h({},n,i()({},a,t[a])):n}if(u.a.isObject(t[a])){var r=z(e[a],t[a]);return!u.a.isObject(r)||Object.keys(r).length>0?h({},n,i()({},a,r)):n}return e[a]!==t[a]?h({},n,i()({},a,t[a])):n}),{}):t}function k(e,t){if(e===t)return[];if(!u.a.isArray(e)||!u.a.isArray(t))return t;if(e.length<=0&&t.length<=0)return[];if(e.length!==t.length)return t;if(!u.a.isObject(t[0]))return t.filter((function(t){return!e.includes(t)}));var n=[];return t.forEach((function(a,i){var s=z(e[i],t[i]);Object.keys(s).length>0&&n.push(t[i])})),n}},vOJG:function(e,t){e.exports='{% block emz_staging_environment_index %}\n    <sw-page class="emz-staging-environment-index">\n        <template slot="smart-bar-actions">\n            <sw-button\n                variant="primary"\n                :routerLink="{ name: \'emz.staging.environment.create\' }"\n            >\n                {{ $t(\'emz-staging-environment.list.addEnvironmentButton\') }}\n            </sw-button>\n        </template>\n        <template #content>\n            {% block emz_staging_environment_list_content %}\n                <sw-entity-listing\n                    v-if="environments"\n                    :items="environments"\n                    :repository="repository"\n                    :showSelection="false"\n                    :columns="columns"\n                    detailRoute="emz.staging.environment.detail"\n                >\n                    <template #column-folderName="{ item, compact }" >\n                        {% block emz_staging_environment_list_content_columns_foldername_label %}\n                            <div>\n                                {# <a v-for="salesChannel in salesChannels" :key="salesChannel.id" href="salesChannel">\n\n                                </a> #}\n                                <a href="#">\n                                    Storefront: {{item.folderName}}\n                                    <sw-icon name="default-action-external" small color="#009bd9"></sw-icon>\n                                </a>\n                                <a href="#">\n                                    Administration: {{item.folderName}}/admin\n                                    <sw-icon name="default-action-external" small color="#009bd9"></sw-icon>\n                                </a>\n                            </div>\n                        {% endblock %}\n                    </template>\n                </sw-entity-listing>\n            {% endblock %}\n        </template>\n    </sw-page>\n{% endblock %} '},yCrm:function(e){e.exports=JSON.parse('{"emz-staging-environment":{"general":{"mainMenuItemGeneral":"Staging Umgebungen","mainMenuItemEnvironments":"Umgebungen","mainMenuItemLogs":"Protokoll","mainMenuItemProfiles":"Profile","descriptionTextModule":"Verwalte deine Staging Umgebungen hier"},"list":{"columnProfileName":"Name","columnEnvironmentName":"Name","columnComment":"Kommentar","columnAccessLinks":"Zugriff","addButtonText":"Profil erstellen","addEnvironmentButton":"Staging Umgebung erstellen"},"detail":{"title":"Staging Umgebung","name":"Name","environmentCardTitle":"Umgebung","errorTitle":"Fehler beim Speichern des Profils","cancelButtonText":"Abbrechen","saveButtonText":"Speichern","profileCardTitle":"Profil","databaseCardTitle":"Datenbank","settingsCardTitle":"Einstellungen","profileNameLabel":"Profil Name","folderNameLabel":"Verzeichnis Name","excludedFoldersLabel":"Ausgeschlossene Verzeichnisse","excludedFoldersHelpText":"Bitte kommagetrennt angeben, z.B. media, documents/files, mein/privater/ordner","commentLabel":"Kommentar","databaseHostLabel":"Datenbank Host","databaseUserLabel":"Datenbank Benutzer","databaseNameLabel":"Datenbank Name","databasePasswordLabel":"Datenbank Passwort","databasePortLabel":"Datenbank Port","anonymizeDataLabel":"Daten anonymisieren","deactivateScheduledTasksLabel":"Geplante Aufgaben deaktivieren","setInMaintenanceLabel":"In Wartungsmodus setzen"},"create":{"title":"Neue Staging Umgebung","name":"Name","start":"Start","processStarted":"Erstellung gestartet!","success":"Umgebung erfolgreich erstellt!","error":"Es ist ein Fehler aufgetreten!","stepsTitle":"Synchronisierung","syncFiles":"Dateien kopieren","syncDatabase":"Datenbank klonen","updateEnv":"Einstellungen vornehmen","prepare":"Vorbereitung","stepsContent":{"preparation":"In der Vorbereitung wird geprüft ob das System bereit für die Anlage einer Staging Umgebung ist.","syncFiles":"In diesem Schritt werden alle wichtigen Dateien in den entsprechenden Unterordner kopiert, sodass Shopware 6 alles hat was es braucht.","cloneDatabase":"Die Datenbank ist ein wichtiger Bestandteil eines lauffähigen Shops. Alle Tabellen und Inhalte werden geklont und bereitgestellt.","updateSettings":"Zum Schluss müssen diverse Einstellungen auf die Staging Umgebung angepasst werden, sodass diese auch zurecht kommt.","finished":"Herzlichen Glückwunsch! Die Staging Umgebung wurde erfolgreich angelegt und steht bereit!"}}}}')}},[["T8cp","runtime","vendors-node"]]]);