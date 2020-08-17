(this.webpackJsonp=this.webpackJsonp||[]).push([["emz-platform-staging-environment"],{"24Ln":function(e){e.exports=JSON.parse('{"emz-staging-environment":{"general":{"mainMenuItemGeneral":"Staging environments","mainMenuItemEnvironments":"Environments","mainMenuItemLogs":"Logs","descriptionTextModule":"Manage your staging environments here"},"list":{"columnEnvironmentName":"Name","columnComment":"Comment","columnAccessLinks":"Access","addEnvironmentButton":"Create new staging environment"},"detail":{"title":"Staging environment","name":"Name","environmentCardTitle":"Environment","cancelButtonText":"Cancel","saveButtonText":"Save","databaseCardTitle":"Database","settingsCardTitle":"Settings","folderNameLabel":"Directory name","subfolderLabel":"Sub folder","subfolderHelptext":"If you are running Shopware in a sub directory you need to add it here, so that the domains for the sales channeles are set correct!","excludedFoldersLabel":"Excluded directories","excludedFoldersHelpText":"Please add comma separated, e.g. media, documents/files, my/private/folder","commentLabel":"Comment","databaseHostLabel":"Database host","databaseUserLabel":"Database user","databaseNameLabel":"Database name","databasePasswordLabel":"Database password","databasePortLabel":"Database port","anonymizeDataLabel":"Anonymize data","deactivateScheduledTasksLabel":"Deactivate scheduled tasks","setInMaintenanceLabel":"Set in maintenance","clearCardTitle":"Reset","clearFiles":"Remove files","clearDatabase":"Clear database","clearDatabaseInfoText":"The configured database will be cleared. All data will be deleted irreversible.","clearDatabaseConfirmLabel":"Yes, please clear the database irreversible.","clearFilesInfoText":"The files of the configured staging environment will be deleted. This process is not reversible.","clearFilesConfirmLabel":"Yes, please delete the files irreversible.","clearFilesHeadline":"Files","clearDatabaseHeadline":"Database"},"create":{"title":"New staging environment","name":"Name","start":"Start","processStarted":"Process started!","success":"Environment created successfully!","error":"Error occured. Environment was not created!","stepsTitle":"Synchronization","syncFiles":"Copy files","syncDatabase":"Clone database","updateEnv":"Update settings","prepare":"Preparation","lastSyncLabel":"Last Synchronization:","stepsContent":{"preparation":"In the preparation step the system proves if everything is correct to create a new staging environment.","syncFiles":"In this step all files will be copied in the appropriate sub folder, so that Shopware 6 has everything it needs to run smoothly.","cloneDatabase":"The database is a crucial part of a running system. All tables will be cloned and filled with the content of the main system.","updateSettings":"At the end some settings needs to be updated on the lately created staging database.","finished":"Congratulations! Your staging environemnt is up and running!"}}}}')},B7z1:function(e,n){e.exports='{% block emz_staging_environment_detail %}\n    <sw-page class="emz-staging-environment-detail">\n        <template slot="smart-bar-header">\n            <h2>\n                {{ $t(\'emz-staging-environment.general.mainMenuItemGeneral\') }}\n                    <sw-icon name="small-arrow-medium-right" small></sw-icon>\n                {{ $t(\'emz-staging-environment.detail.title\') }}\n            </h2>\n        </template>\n\n        <template slot="smart-bar-actions">\n            <sw-button\n                :routerLink="{ name: \'emz.staging.environment.index\' }"\n            >\n                {{ $t(\'emz-staging-environment.detail.cancelButtonText\') }}\n            </sw-button>\n            <sw-button-process\n                variant="primary"\n                @click="onClickSave"\n                :isLoading="isLoading"\n                :processSuccess="processSuccess.createNewStagingEnvironment"\n                @process-finish="resetButton"\n            >\n                {{ $t(\'emz-staging-environment.detail.saveButtonText\') }}\n            </sw-button-process>\n        </template>\n        \n        <template #content>\n            <sw-card-view>\n                <sw-card\n                    v-if="readyToSync"\n                    :title="$t(\'emz-staging-environment.create.stepsTitle\')"\n                >\n                    <sw-container columns="1fr 1fr">\n                        <sw-card-section divider="right">\n                            <sw-step-display :itemIndex="stepIndex"\n                                :itemVariant="stepVariant"\n                                :initialItemVariants="stepInitialItemVariants">\n                                <sw-step-item>\n                                    {{ $t(\'emz-staging-environment.create.prepare\') }}\n                                </sw-step-item>\n                                <sw-step-item>\n                                    {{ $t(\'emz-staging-environment.create.syncFiles\') }}\n                                </sw-step-item>\n                                <sw-step-item>\n                                    {{ $t(\'emz-staging-environment.create.syncDatabase\') }}\n                                </sw-step-item>\n                                <sw-step-item>\n                                    {{ $t(\'emz-staging-environment.create.updateEnv\') }}\n                                </sw-step-item>\n                            </sw-step-display>\n                        </sw-card-section>\n                        <sw-card-section>\n                            <div v-if="processes.createNewStagingEnvironment" class="emz-staging-environment-content-loader">\n                                <sw-loader \n                                    size="50px"\n                                >\n                                </sw-loader>\n                            </div>\n                            <p>{{stepContent}}</p>\n                        </sw-card-section>\n                    </sw-container>\n\n                    <sw-container columns="1fr 1fr">\n                        <sw-card-section divider="right">\n                            <sw-label v-if="lastSync" variant="success" size="default" appearance="default" :caps="true">\n                                <strong>{{$t(\'emz-staging-environment.create.lastSyncLabel\')}}</strong> {{ lastSync }}\n                            </sw-label>\n                        </sw-card-section>\n                        <sw-card-section class="text-right">\n                            <sw-button-process variant="ghost"\n                                :isLoading="processes.createNewStagingEnvironment"\n                                :processSuccess="processSuccess.createNewStagingEnvironment"\n                                @process-finish="resetButton"\n                                @click="createNewStatingEnvironment"\n                            >\n                                {{ $t(\'emz-staging-environment.create.start\') }}\n                            </sw-button-process>\n                        </sw-card-section>\n                    </sw-container>\n                </sw-card>\n                \n                <sw-card\n                    v-if="environment"\n                    :isLoading="isLoading"\n                    :title="$t(\'emz-staging-environment.detail.environmentCardTitle\')"\n                >\n                    <sw-container columns="1fr 1fr 1fr" gap="32px">\n                        <sw-text-field\n                            :label="$t(\'emz-staging-environment.detail.name\')"\n                            :placeholder="$t(\'emz-staging-environment.detail.name\')"\n                            v-model="environment.environmentName"\n                            required\n                        >\n                        </sw-text-field>\n                        \n                        <sw-text-field\n                                :label="$t(\'emz-staging-environment.detail.subfolderLabel\')"\n                                :placeholder="$t(\'emz-staging-environment.detail.subfolderLabel\')"\n                                v-model="environment.subFolder"\n                                :helpText="$t(\'emz-staging-environment.detail.subfolderHelptext\')"\n                            >\n                        </sw-text-field>\n\n                        <sw-text-field\n                                :label="$t(\'emz-staging-environment.detail.folderNameLabel\')"\n                                :placeholder="$t(\'emz-staging-environment.detail.folderNameLabel\')"\n                                v-model="environment.folderName"\n                                validation="required"\n                                required\n                            >\n                        </sw-text-field>\n                    </sw-container>\n\n                    <sw-text-field\n                        :label="$t(\'emz-staging-environment.detail.excludedFoldersLabel\')"\n                        :placeholder="$t(\'emz-staging-environment.detail.excludedFoldersLabel\')"\n                        v-model="environment.excludedFolders"\n                        :helpText="$t(\'emz-staging-environment.detail.excludedFoldersHelpText\')"\n                    >\n                    </sw-text-field>\n\n                    <sw-textarea-field\n                        :label="$t(\'emz-staging-environment.detail.commentLabel\')"\n                        :placeholder="$t(\'emz-staging-environment.detail.commentLabel\')"\n                        v-model="environment.comment"\n                    >\n                    </sw-textarea-field>\n                </sw-card>\n\n                <sw-card\n                    v-if="environment"\n                    :isLoading="isLoading"\n                    :title="$t(\'emz-staging-environment.detail.databaseCardTitle\')"\n                >\n                    <sw-text-field\n                        :label="$t(\'emz-staging-environment.detail.databaseHostLabel\')"\n                        :placeholder="$t(\'emz-staging-environment.detail.databaseHostLabel\')"\n                        v-model="environment.databaseHost"\n                        required\n                    >\n                    </sw-text-field>\n\n                    <sw-text-field\n                        :label="$t(\'emz-staging-environment.detail.databaseUserLabel\')"\n                        :placeholder="$t(\'emz-staging-environment.detail.databaseUserLabel\')"\n                        v-model="environment.databaseUser"\n                        required\n                    >\n                    </sw-text-field>\n\n                    <sw-text-field\n                        :label="$t(\'emz-staging-environment.detail.databaseNameLabel\')"\n                        :placeholder="$t(\'emz-staging-environment.detail.databaseNameLabel\')"\n                        v-model="environment.databaseName"\n                        required\n                    >\n                    </sw-text-field>\n\n                    <sw-password-field\n                        :label="$t(\'emz-staging-environment.detail.databasePasswordLabel\')"\n                        :placeholder="$t(\'emz-staging-environment.detail.databasePasswordLabel\')"\n                        v-model="environment.databasePassword"\n                        required\n                    >\n                    </sw-password-field>\n\n                    <sw-text-field\n                        :label="$t(\'emz-staging-environment.detail.databasePortLabel\')"\n                        :placeholder="$t(\'emz-staging-environment.detail.databasePortLabel\')"\n                        v-model="environment.databasePort"\n                        required\n                    >\n                    </sw-text-field>\n                </sw-card>\n\n                <sw-card\n                    v-if="environment"\n                    :isLoading="isLoading"\n                    :title="$t(\'emz-staging-environment.detail.settingsCardTitle\')"\n                >\n                    <sw-checkbox-field\n                        :label="$t(\'emz-staging-environment.detail.setInMaintenanceLabel\')"\n                        v-model="environment.setInMaintenance"\n                    >\n                    </sw-checkbox-field>\n                </sw-card>\n\n                <sw-card\n                    v-if="environment"\n                    :isLoading="isLoading"\n                    :title="$t(\'emz-staging-environment.detail.clearCardTitle\')"\n                >\n                    <sw-container columns="1fr 1fr">\n                        <sw-card-section divider="right">\n                            <h3>{{ $t(\'emz-staging-environment.detail.clearDatabaseHeadline\') }}</h3>\n                            <sw-alert variant="warning">{{ $t(\'emz-staging-environment.detail.clearDatabaseInfoText\') }}</sw-alert>\n\n                            <sw-checkbox-field :label="$t(\'emz-staging-environment.detail.clearDatabaseConfirmLabel\')" v-model="clearDatabaseConfirmation"></sw-checkbox-field>\n\n                            <sw-button-process variant="danger"\n                                {# :isLoading="processes.createNewStagingEnvironment" #}\n                                :processSuccess="processSuccess.clearDatabase"\n                                {# @process-finish="resetButton" #}\n                                @click="clearDatabase"\n                            >\n                                {{ $t(\'emz-staging-environment.detail.clearDatabase\') }}\n                            </sw-button-process>\n                        </sw-card-section>\n                        <sw-card-section>\n                            <h3>{{ $t(\'emz-staging-environment.detail.clearFilesHeadline\') }}</h3>\n                            <sw-alert variant="warning">{{ $t(\'emz-staging-environment.detail.clearFilesInfoText\') }}</sw-alert>\n\n                            <sw-checkbox-field :label="$t(\'emz-staging-environment.detail.clearFilesConfirmLabel\')" v-model="clearFilesConfirmation"></sw-checkbox-field>\n\n                            <sw-button-process variant="danger"\n                                {# :isLoading="processes.createNewStagingEnvironment" #}\n                                :processSuccess="processSuccess.clearFiles"\n                                {# @process-finish="resetButton" #}\n                                @click="clearFiles"\n                            >\n                                {{ $t(\'emz-staging-environment.detail.clearFiles\') }}\n                            </sw-button-process>\n                        </sw-card-section>\n                    </sw-container>\n                </sw-card>\n            </sw-card-view>\n        </template>\n    </sw-page>\n{% endblock %}'},CkOj:function(e,n,t){"use strict";t.d(n,"a",(function(){return c}));var i=t("lSNA"),a=t.n(i),s=t("lO2t"),r=t("lYO9");function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e){var n=function(e){var n;if(s.a.isString(e))try{n=JSON.parse(e)}catch(e){return!1}else{if(!s.a.isObject(e)||s.a.isArray(e))return!1;n=e}return n}(e);if(!n)return null;if(!0===n.parsed||!function(e){return void 0!==e.data||void 0!==e.errors||void 0!==e.links||void 0!==e.meta}(n))return n;var t=function(e){var n={links:null,errors:null,data:null,associations:null,aggregations:null};if(e.errors)return n.errors=e.errors,n;var t=function(e){var n=new Map;if(!e||!e.length)return n;return e.forEach((function(e){var t="".concat(e.type,"-").concat(e.id);n.set(t,e)})),n}(e.included);if(s.a.isArray(e.data))n.data=e.data.map((function(e){var i=d(e,t);return Object(r.f)(i,"associationLinks")&&(n.associations=l({},n.associations,{},i.associationLinks),delete i.associationLinks),i}));else if(s.a.isObject(e.data)){var i=d(e.data,t);Object.prototype.hasOwnProperty.call(i,"associationLinks")&&(n.associations=l({},n.associations,{},i.associationLinks),delete i.associationLinks),n.data=i}else n.data=null;e.meta&&Object.keys(e.meta).length&&(n.meta=m(e.meta));e.links&&Object.keys(e.links).length&&(n.links=e.links);e.aggregations&&Object.keys(e.aggregations).length&&(n.aggregations=e.aggregations);return n}(n);return t.parsed=!0,t}function d(e,n){var t={id:e.id,type:e.type,links:e.links||{},meta:e.meta||{}};e.attributes&&Object.keys(e.attributes).length>0&&(t=l({},t,{},m(e.attributes)));if(e.relationships){var i=function(e,n){var t={},i={};return Object.keys(e).forEach((function(a){var r=e[a];if(r.links&&Object.keys(r.links).length&&(i[a]=r.links.related),r.data){var o=r.data;s.a.isArray(o)?t[a]=o.map((function(e){return g(e,n)})):s.a.isObject(o)?t[a]=g(o,n):t[a]=null}})),{mappedRelations:t,associationLinks:i}}(e.relationships,n);t=l({},t,{},i.mappedRelations,{},{associationLinks:i.associationLinks})}return t}function m(e){var n={};return Object.keys(e).forEach((function(t){var i=e[t],a=t.replace(/-([a-z])/g,(function(e,n){return n.toUpperCase()}));n[a]=i})),n}function g(e,n){var t="".concat(e.type,"-").concat(e.id);return n.has(t)?d(n.get(t),n):e}},DNno:function(e,n,t){},HBnn:function(e,n){const{Component:t,Context:i}=Shopware;t.extend("emz-staging-environment-create","emz-staging-environment-detail",{methods:{getEnvironment(){this.environment=this.repositoryEnvironment.create(i.api),this.isLoading=!1},onClickSave(){this.isLoading=!0,this.repositoryEnvironment.save(this.environment,i.api).then(()=>{this.isLoading=!1,this.$router.push({name:"emz.staging.environment.detail",params:{id:this.environment.id}})}).catch(e=>{this.isLoading=!1,this.createNotificationError({title:this.$t("emz-staging-environment.detail.errorTitle"),message:e})})}}})},SJIK:function(e,n,t){var i=t("DNno");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,t("SZ7m").default)("793f0eb0",i,!0,{})},SwLI:function(e,n,t){"use strict";t.r(n);var i=t("lwsE"),a=t.n(i),s=t("W8MJ"),r=t.n(s),o=t("CkOj"),l=function(){function e(n,t,i){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/vnd.api+json";a()(this,e),this.httpClient=n,this.loginService=t,this.apiEndpoint=i,this.contentType=s}return r()(e,[{key:"getList",value:function(n){var t=n.page,i=void 0===t?1:t,a=n.limit,s=void 0===a?25:a,r=n.sortBy,o=n.sortDirection,l=void 0===o?"asc":o,c=n.sortings,d=n.queries,m=n.term,g=n.criteria,u=n.aggregations,h=n.associations,p=n.headers,v=n.versionId,b=n.ids,f=n["total-count-mode"],w=void 0===f?0:f,y=this.getBasicHeaders(p),S={page:i,limit:s};return c?S.sort=c:r&&r.length&&(S.sort=("asc"===l.toLowerCase()?"":"-")+r),b&&(S.ids=b.join("|")),m&&(S.term=m),g&&(S.filter=[g.getQuery()]),u&&(S.aggregations=u),h&&(S.associations=h),v&&(y=Object.assign(y,e.getVersionHeader(v))),d&&(S.query=d),w&&(S["total-count-mode"]=w),S.term&&S.term.length||S.filter&&S.filter.length||S.aggregations||S.sort||S.queries||S.associations?this.httpClient.post("".concat(this.getApiBasePath(null,"search")),S,{headers:y}).then((function(n){return e.handleResponse(n)})):this.httpClient.get(this.getApiBasePath(),{params:S,headers:y}).then((function(n){return e.handleResponse(n)}))}},{key:"getById",value:function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!n)return Promise.reject(new Error("Missing required argument: id"));var a=t,s=this.getBasicHeaders(i);return this.httpClient.get(this.getApiBasePath(n),{params:a,headers:s}).then((function(n){return e.handleResponse(n)}))}},{key:"updateById",value:function(n,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if(!n)return Promise.reject(new Error("Missing required argument: id"));var s=i,r=this.getBasicHeaders(a);return this.httpClient.patch(this.getApiBasePath(n),t,{params:s,headers:r}).then((function(n){return e.handleResponse(n)}))}},{key:"deleteAssociation",value:function(e,n,t,i){if(!e||!t||!t)return Promise.reject(new Error("Missing required arguments."));var a=this.getBasicHeaders(i);return this.httpClient.delete("".concat(this.getApiBasePath(e),"/").concat(n,"/").concat(t),{headers:a}).then((function(e){return e.status>=200&&e.status<300?Promise.resolve(e):Promise.reject(e)}))}},{key:"create",value:function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=t,s=this.getBasicHeaders(i);return this.httpClient.post(this.getApiBasePath(),n,{params:a,headers:s}).then((function(n){return e.handleResponse(n)}))}},{key:"delete",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!e)return Promise.reject(new Error("Missing required argument: id"));var i=Object.assign({},n),a=this.getBasicHeaders(t);return this.httpClient.delete(this.getApiBasePath(e),{params:i,headers:a})}},{key:"clone",value:function(n){return n?this.httpClient.post("/_action/clone/".concat(this.apiEndpoint,"/").concat(n),null,{headers:this.getBasicHeaders()}).then((function(n){return e.handleResponse(n)})):Promise.reject(new Error("Missing required argument: id"))}},{key:"versionize",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i="/_action/version/".concat(this.apiEndpoint,"/").concat(e),a=Object.assign({},n),s=this.getBasicHeaders(t);return this.httpClient.post(i,{},{params:a,headers:s})}},{key:"mergeVersion",value:function(n,t,i,a){if(!n)return Promise.reject(new Error("Missing required argument: id"));if(!t)return Promise.reject(new Error("Missing required argument: versionId"));var s=Object.assign({},i),r=Object.assign(e.getVersionHeader(t),this.getBasicHeaders(a)),o="_action/version/merge/".concat(this.apiEndpoint,"/").concat(t);return this.httpClient.post(o,{},{params:s,headers:r})}},{key:"getApiBasePath",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",t="";return n&&n.length&&(t+="".concat(n,"/")),e&&e.length>0?"".concat(t).concat(this.apiEndpoint,"/").concat(e):"".concat(t).concat(this.apiEndpoint)}},{key:"getBasicHeaders",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n={Accept:this.contentType,Authorization:"Bearer ".concat(this.loginService.getToken()),"Content-Type":"application/json"};return Object.assign({},n,e)}},{key:"apiEndpoint",get:function(){return this.endpoint},set:function(e){this.endpoint=e}},{key:"httpClient",get:function(){return this.client},set:function(e){this.client=e}},{key:"contentType",get:function(){return this.type},set:function(e){this.type=e}}],[{key:"handleResponse",value:function(n){if(null===n.data||void 0===n.data)return n;var t=n.data,i=n.headers;return i&&i["content-type"]&&"application/vnd.api+json"===i["content-type"]&&(t=e.parseJsonApiData(t)),t}},{key:"parseJsonApiData",value:function(e){return Object(o.a)(e)}},{key:"getVersionHeader",value:function(e){return{"sw-version-id":e}}}]),e}();n.default=l},T8cp:function(e,n,t){"use strict";t.r(n);var i=t("vOJG"),a=t.n(i);const{Component:s,Data:r}=Shopware,{Criteria:o}=r;s.register("emz-staging-environment-index",{template:a.a,metaInfo(){return{title:this.$createTitle()}},inject:["repositoryFactory"],data:()=>({repository:null,environments:null}),created(){this.repository=this.repositoryFactory.create("emz_pse_environment"),this.repository.search(new o,Shopware.Context.api).then(e=>{this.environments=e})},computed:{columns(){return[{property:"environmentName",dataIndex:"environmentName",label:this.$t("emz-staging-environment.list.columnEnvironmentName"),routerLink:"emz.staging.environment.detail",inlineEdit:"string",allowResize:!0,primary:!0},{property:"comment",dataIndex:"comment",label:this.$t("emz-staging-environment.list.columnComment"),inlineEdit:"string",allowResize:!0}]}},methods:{}});var l=t("B7z1"),c=t.n(l);t("SJIK");const{Component:d,Context:m,Data:g,Mixin:u}=Shopware,{Criteria:h}=g;d.register("emz-staging-environment-detail",{template:c.a,mixins:[u.getByName("notification")],inject:["repositoryFactory","stagingEnvironmentApiService"],metaInfo(){return{title:this.$createTitle()}},data:()=>({environment:null,repositoryEnvironment:null,isLoading:!0,readyToSync:!1,processes:{createNewStagingEnvironment:!1},processSuccess:{createNewStagingEnvironment:!1,clearDatabase:!1,clearFiles:!1},stepVariant:"info",currentStep:1,lastSync:null,clearFilesConfirmation:null,clearDatabaseConfirmation:null}),computed:{stepIndex(){return this.currentStep<1?0:this.currentStep-1},stepInitialItemVariants(){return[["disabled","disabled","disabled","disabled"],["success","disabled","disabled","disabled"],["success","info","disabled","disabled"],["success","success","info","disabled"],["success","success","success","info"],["success","success","success","success"]][this.currentStep]},stepContent(){return["",this.$t("emz-staging-environment.create.stepsContent.preparation"),this.$t("emz-staging-environment.create.stepsContent.syncFiles"),this.$t("emz-staging-environment.create.stepsContent.cloneDatabase"),this.$t("emz-staging-environment.create.stepsContent.updateSettings"),this.$t("emz-staging-environment.create.stepsContent.finished")][this.currentStep]}},created(){this.repositoryEnvironment=this.repositoryFactory.create("emz_pse_environment"),this.getEnvironment()},methods:{getEnvironment(){this.repositoryEnvironment.get(this.$route.params.id,m.api).then(e=>{this.environment=e,this.readyToSync=!0,this.isLoading=!1,this.getLastSync()})},onClickSave(){this.isLoading=!0,this.repositoryEnvironment.save(this.environment,m.api).then(()=>{this.getEnvironment(),this.isLoading=!1,this.getLastSync()}).catch(e=>{this.createNotificationError({title:this.$t("emz-staging-environment.detail.errorTitle"),message:e})})},createNewStatingEnvironment(){return this.createNotificationInfo({title:this.$t("global.default.info"),message:this.$t("emz-staging-environment.create.processStarted")}),this.processes.createNewStagingEnvironment=!0,this.currentStep=2,this.stagingEnvironmentApiService.syncFiles({environmentId:this.environment.id}).then(()=>{this.createNotificationSuccess({title:this.$t("global.default.success"),message:"Sync files finished"}),this.currentStep++,this.stagingEnvironmentApiService.cloneDatabase({environmentId:this.environment.id}).then(e=>{if(0==e.data.status)return this.reset(),void this.createNotificationError({title:this.$t("global.default.error"),message:e.data.message});this.createNotificationSuccess({title:this.$t("global.default.success"),message:"clone database finished"}),this.currentStep++,this.stagingEnvironmentApiService.updateSettings({environmentId:this.environment.id}).then(()=>{this.processes.createNewStagingEnvironment=!1,this.createNotificationSuccess({title:this.$t("global.default.success"),message:"update settings finished"}),this.currentStep++}).catch(()=>{this.reset(),this.createNotificationError({title:this.$t("global.default.error"),message:this.$t("emz-staging-environment.create.error")})}).finally(()=>{this.processes.createNewStagingEnvironment=!1,this.currentStep=5,this.getLastSync()})}).catch(({response:e})=>{e.data.errors.forEach(e=>{this.createNotificationError({title:this.$t("global.default.error"),message:`${e.detail}`})}),this.reset()})}).catch(()=>{this.reset(),this.createNotificationError({title:this.$t("global.default.error"),message:this.$t("emz-staging-environment.create.error")})})},resetButton(){this.processSuccess={createNewStagingEnvironment:!1}},reset(){this.processes.createNewStagingEnvironment=!1,this.currentStep=1},getLastSync(){this.environment&&this.environment.id&&this.stagingEnvironmentApiService.getLastSync({environmentId:this.environment.id}).then(e=>{e&&e.data&&e.data.lastSync&&(this.lastSync=e.data.lastSync)})},clearDatabase(){this.environment&&this.environment.id&&this.stagingEnvironmentApiService.clearDatabase({environmentId:this.environment.id}).then(()=>{console.log("CLEARED DATABASE")})},clearFiles(){this.environment&&this.environment.id&&this.stagingEnvironmentApiService.clearFiles({environmentId:this.environment.id}).then(()=>{console.log("CLEARED FILES")})}}});t("HBnn");var p=t("yCrm"),v=t("24Ln"),b=t("SwLI");class f extends b.default{constructor(e,n,t="environment"){super(e,n,t),this.name="stagingEnvironmentApiService"}syncFiles({environmentId:e},n={},t={}){const i=this.getBasicHeaders({}),a={environmentId:e};return this.httpClient.post("/_action/emz_pse/environment/sync_files",a,{headers:i})}cloneDatabase({environmentId:e},n={},t={}){const i=this.getBasicHeaders(),a={environmentId:e};return this.httpClient.post("/_action/emz_pse/environment/clone_database",a,{headers:i})}updateSettings({environmentId:e},n={},t={}){const i=this.getBasicHeaders(),a={environmentId:e};return this.httpClient.post("/_action/emz_pse/environment/update_settings",a,{headers:i})}getLastSync({environmentId:e},n={},t={}){const i=this.getBasicHeaders(),a={environmentId:e};return this.httpClient.post("/_action/emz_pse/environment/get_last_sync",a,{headers:i})}clearDatabase({environmentId:e},n={},t={}){const i=this.getBasicHeaders(),a={environmentId:e};return this.httpClient.post("/_action/emz_pse/environment/clear_database",a,{headers:i})}clearFiles({environmentId:e},n={},t={}){const i=this.getBasicHeaders(),a={environmentId:e};return this.httpClient.post("/_action/emz_pse/environment/clear_files",a,{headers:i})}}var w=f;const{Module:y,Application:S}=Shopware;y.register("emz-staging-environment",{type:"plugin",name:"Staging",title:"emz-staging-environment.general.mainMenuItemGeneral",description:"emz-staging-environment.general.descriptionTextModule",color:"#009bd9",icon:"default-device-server",snippets:{"de-DE":p,"en-GB":v},routes:{index:{component:"emz-staging-environment-index",path:"index"},detail:{component:"emz-staging-environment-detail",path:"detail/:id",meta:{parentPath:"emz.staging.environment.index"}},create:{component:"emz-staging-environment-create",path:"create",meta:{parentPath:"emz.staging.environment.index"}}},navigation:[{id:"emz-staging-environment",label:"emz-staging-environment.general.mainMenuItemGeneral",color:"#009bd9",path:"emz.staging.environment.index",icon:"default-device-server",parent:"sw-catalogue",position:100}]}),S.addServiceProvider("stagingEnvironmentApiService",e=>{const n=S.getContainer("init");return new w(n.httpClient,e.loginService)})},lO2t:function(e,n,t){"use strict";t.d(n,"b",(function(){return E}));var i=t("GoyQ"),a=t.n(i),s=t("YO3V"),r=t.n(s),o=t("E+oP"),l=t.n(o),c=t("wAXd"),d=t.n(c),m=t("Z0cm"),g=t.n(m),u=t("lSCD"),h=t.n(u),p=t("YiAA"),v=t.n(p),b=t("4qC0"),f=t.n(b),w=t("Znm+"),y=t.n(w),S=t("Y+p1"),z=t.n(S),k=t("UB5X"),L=t.n(k);function E(e){return void 0===e}n.a={isObject:a.a,isPlainObject:r.a,isEmpty:l.a,isRegExp:d.a,isArray:g.a,isFunction:h.a,isDate:v.a,isString:f.a,isBoolean:y.a,isEqual:z.a,isNumber:L.a,isUndefined:E}},lYO9:function(e,n,t){"use strict";t.d(n,"g",(function(){return v})),t.d(n,"a",(function(){return b})),t.d(n,"c",(function(){return f})),t.d(n,"h",(function(){return w})),t.d(n,"f",(function(){return y})),t.d(n,"b",(function(){return S})),t.d(n,"e",(function(){return z})),t.d(n,"d",(function(){return k}));var i=t("lSNA"),a=t.n(i),s=t("QkVN"),r=t.n(s),o=t("BkRI"),l=t.n(o),c=t("mwIZ"),d=t.n(c),m=t("D1y2"),g=t.n(m),u=t("lO2t");function h(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?h(Object(t),!0).forEach((function(n){a()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):h(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}r.a,l.a,d.a,g.a;var v=r.a,b=l.a,f=d.a,w=g.a;function y(e,n){return Object.prototype.hasOwnProperty.call(e,n)}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return JSON.parse(JSON.stringify(e))}function z(e,n){return e===n?{}:u.a.isObject(e)&&u.a.isObject(n)?u.a.isDate(e)||u.a.isDate(n)?e.valueOf()===n.valueOf()?{}:n:Object.keys(n).reduce((function(t,i){if(!y(e,i))return p({},t,a()({},i,n[i]));if(u.a.isArray(n[i])){var s=k(e[i],n[i]);return Object.keys(s).length>0?p({},t,a()({},i,n[i])):t}if(u.a.isObject(n[i])){var r=z(e[i],n[i]);return!u.a.isObject(r)||Object.keys(r).length>0?p({},t,a()({},i,r)):t}return e[i]!==n[i]?p({},t,a()({},i,n[i])):t}),{}):n}function k(e,n){if(e===n)return[];if(!u.a.isArray(e)||!u.a.isArray(n))return n;if(e.length<=0&&n.length<=0)return[];if(e.length!==n.length)return n;if(!u.a.isObject(n[0]))return n.filter((function(n){return!e.includes(n)}));var t=[];return n.forEach((function(i,a){var s=z(e[a],n[a]);Object.keys(s).length>0&&t.push(n[a])})),t}},vOJG:function(e,n){e.exports='{% block emz_staging_environment_index %}\n    <sw-page class="emz-staging-environment-index">\n        <template slot="smart-bar-actions">\n            <sw-button\n                variant="primary"\n                :routerLink="{ name: \'emz.staging.environment.create\' }"\n            >\n                {{ $t(\'emz-staging-environment.list.addEnvironmentButton\') }}\n            </sw-button>\n        </template>\n        <template #content>\n            {% block emz_staging_environment_list_content %}\n                <sw-entity-listing\n                    v-if="environments"\n                    :items="environments"\n                    :repository="repository"\n                    :showSelection="false"\n                    :columns="columns"\n                    detailRoute="emz.staging.environment.detail"\n                >\n                </sw-entity-listing>\n            {% endblock %}\n        </template>\n    </sw-page>\n{% endblock %} '},yCrm:function(e){e.exports=JSON.parse('{"emz-staging-environment":{"general":{"mainMenuItemGeneral":"Staging Umgebungen","mainMenuItemEnvironments":"Umgebungen","mainMenuItemLogs":"Protokoll","descriptionTextModule":"Verwalte deine Staging Umgebungen hier"},"list":{"columnEnvironmentName":"Name","columnComment":"Kommentar","columnAccessLinks":"Zugriff","addEnvironmentButton":"Staging Umgebung erstellen"},"detail":{"title":"Staging Umgebung","name":"Name","environmentCardTitle":"Umgebung","errorTitle":"Fehler beim Speichern","cancelButtonText":"Abbrechen","saveButtonText":"Speichern","databaseCardTitle":"Datenbank","settingsCardTitle":"Einstellungen","folderNameLabel":"Verzeichnis Name","subfolderLabel":"Unterverzeichnis","subfolderHelptext":"Falls Sie Shopware in einem Unterverzeichnis installiert haben, ist es wichtig diesen hier anzugeben, sodass die Domains der Saleschannel korrekt erweitert werden können.","excludedFoldersLabel":"Ausgeschlossene Verzeichnisse","excludedFoldersHelpText":"Bitte kommagetrennt angeben, z.B. media, documents/files, mein/privater/ordner","commentLabel":"Kommentar","databaseHostLabel":"Datenbank Host","databaseUserLabel":"Datenbank Benutzer","databaseNameLabel":"Datenbank Name","databasePasswordLabel":"Datenbank Passwort","databasePortLabel":"Datenbank Port","anonymizeDataLabel":"Daten anonymisieren","deactivateScheduledTasksLabel":"Geplante Aufgaben deaktivieren","setInMaintenanceLabel":"In Wartungsmodus setzen","clearCardTitle":"Zurücksetzen","clearFiles":"Dateien entfernen","clearDatabase":"Datenbank leeren","clearDatabaseInfoText":"Die konfigurierte Staging Datenbank wird komplett geleert. Alle Inhalte werden unwiderruflich gelöscht.","clearDatabaseConfirmLabel":"Ja, bitte die Datenbank vollständig löschen.","clearFilesInfoText":"Die Dateien der konfigurierten Staging werden gelöscht. Dieser Vorgang ist nicht umkehrbar.","clearFilesConfirmLabel":"Ja, bitte die Dateien vollständig löschen.","clearFilesHeadline":"Dateien","clearDatabaseHeadline":"Datenbank"},"create":{"title":"Neue Staging Umgebung","name":"Name","start":"Start","processStarted":"Erstellung gestartet!","success":"Umgebung erfolgreich erstellt!","error":"Es ist ein Fehler aufgetreten!","stepsTitle":"Synchronisierung","syncFiles":"Dateien kopieren","syncDatabase":"Datenbank klonen","updateEnv":"Einstellungen vornehmen","prepare":"Vorbereitung","lastSyncLabel":"Letzte Synchronisierung:","stepsContent":{"preparation":"In der Vorbereitung wird geprüft ob das System bereit für die Anlage einer Staging Umgebung ist.","syncFiles":"In diesem Schritt werden alle wichtigen Dateien in den entsprechenden Unterordner kopiert, sodass Shopware 6 alles hat was es braucht.","cloneDatabase":"Die Datenbank ist ein wichtiger Bestandteil eines lauffähigen Shops. Alle Tabellen und Inhalte werden geklont und bereitgestellt.","updateSettings":"Zum Schluss müssen diverse Einstellungen auf die Staging Umgebung angepasst werden, sodass diese auch zurecht kommt.","finished":"Herzlichen Glückwunsch! Die Staging Umgebung wurde erfolgreich angelegt und steht bereit!"}}}}')}},[["T8cp","runtime","vendors-node"]]]);