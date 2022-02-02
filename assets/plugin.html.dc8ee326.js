import{r as e,o as t,a as o,b as s,d as p,F as c,e as a,c as r}from"./app.cd156c98.js";import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";const l={},d=s("h1",{id:"\u4F7F\u7528\u63D2\u4EF6",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#\u4F7F\u7528\u63D2\u4EF6","aria-hidden":"true"},"#"),a(" \u4F7F\u7528\u63D2\u4EF6")],-1),u=s("p",null,"\u63D2\u4EF6\u673A\u5236\u662F\u76EE\u524D\u524D\u7AEF\u6BD4\u8F83\u6D41\u884C\u7684\u4E00\u79CD\u529F\u80FD\u62D3\u5C55\u65B9\u5F0F\uFF0C\u63D2\u4EF6\u7684\u4F18\u52BF\u5728\u4E8E\u53EF\u4EE5\u4FDD\u8BC1\u6838\u5FC3\u7684\u8DB3\u591F\u7CBE\u7B80\u3001\u7A33\u5B9A\u3001\u9AD8\u6548\uFF0C\u8FD8\u53EF\u4EE5\u590D\u7528\u73B0\u6709\u7684\u4E1A\u52A1\u903B\u8F91\uFF0C\u5F62\u6210\u7279\u5B9A\u7684\u751F\u6001\u5708\u3002",-1),h=s("h2",{id:"\u5B89\u88C5\u4F9D\u8D56",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#\u5B89\u88C5\u4F9D\u8D56","aria-hidden":"true"},"#"),a(" \u5B89\u88C5\u4F9D\u8D56")],-1),k=s("p",null,"\u63D2\u4EF6\u53EF\u4EE5\u4F7F\u7528 NPM \u6A21\u5757\u7684\u65B9\u5F0F\u8FDB\u884C\u590D\u7528",-1),_={class:"custom-container tip"},m=s("p",{class:"custom-container-title"},"TIP",-1),x=a("\u652F\u6301 Axios \u7684\u751F\u6001\u63D2\u4EF6\uFF0C\u4F60\u53EF\u4EE5\u5728 "),g={href:"https://www.npmjs.com/search?q=axios%20plugin",target:"_blank",rel:"noopener noreferrer"},f=a("\u8FD9\u91CC"),v=a(" \u67E5\u770B\u793E\u533A\u5F00\u53D1\u7684 Axios \u63D2\u4EF6\u3002"),y=r(`<div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u6DFB\u52A0\u81EA\u52A8\u91CD\u8BD5\u529F\u80FD</span>
$ <span class="token function">npm</span> <span class="token function">install</span> axios-retry --save
</code></pre></div><h2 id="\u5B89\u88C5\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5\u63D2\u4EF6" aria-hidden="true">#</a> \u5B89\u88C5\u63D2\u4EF6</h2><p>\u5982\u679C\u63D2\u4EF6\u662F\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u5FC5\u987B\u63D0\u4F9B install \u65B9\u6CD5\u3002\u5982\u679C\u63D2\u4EF6\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u5B83\u4F1A\u88AB\u4F5C\u4E3A install \u65B9\u6CD5\u3002install \u65B9\u6CD5\u8C03\u7528\u65F6\uFF0C\u4F1A\u5C06 Axios \u5B9E\u4F8B\u4F5C\u4E3A\u53C2\u6570\u4F20\u5165\u3002</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>\u5F53 install \u65B9\u6CD5\u88AB\u540C\u4E00\u4E2A\u63D2\u4EF6\u591A\u6B21\u8C03\u7528\uFF0C\u63D2\u4EF6\u5C06\u53EA\u4F1A\u88AB\u5B89\u88C5\u4E00\u6B21\u3002</p></div><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">import</span> http <span class="token keyword">from</span> <span class="token string">&#39;@zhengxs/axios-http&#39;</span>
<span class="token keyword">import</span> axiosRetry <span class="token keyword">from</span> <span class="token string">&#39;axios-retry&#39;</span>

http<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>axiosRetry<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">retries</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>\u4E5F\u53EF\u4EE5\u4F20\u5165\u4E00\u4E2A\u53EF\u9009\u7684\u9009\u9879\u5BF9\u8C61</p><div class="language-javascript ext-js"><pre class="language-javascript"><code>http<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>axiosRetry<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">retries</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p><code>http.use</code> \u4F1A\u81EA\u52A8\u963B\u6B62\u591A\u6B21\u6CE8\u518C\u76F8\u540C\u63D2\u4EF6\uFF0C\u5373\u4F7F\u591A\u6B21\u8C03\u7528\u4E5F\u53EA\u4F1A\u6CE8\u518C\u4E00\u6B21\u8BE5\u63D2\u4EF6\u3002</p><h2 id="\u5982\u4F55\u5F00\u53D1\u4E00\u4E2A\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u5F00\u53D1\u4E00\u4E2A\u63D2\u4EF6" aria-hidden="true">#</a> \u5982\u4F55\u5F00\u53D1\u4E00\u4E2A\u63D2\u4EF6</h2><p>\u53C2\u89C1\u6587\u6863\uFF1A<a href="../advanced/plugin">\u63D2\u4EF6\u5F00\u53D1</a>\u3002</p>`,10);function b(j,w){const n=e("ExternalLinkIcon");return t(),o(c,null,[d,u,h,k,s("div",_,[m,s("p",null,[x,s("a",g,[f,p(n)]),v])]),y],64)}var V=i(l,[["render",b]]);export{V as default};
