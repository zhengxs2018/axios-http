import{c as n}from"./app.5a277da4.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},p=n(`<h1 id="\u5FEB\u901F\u4E0A\u624B" tabindex="-1"><a class="header-anchor" href="#\u5FEB\u901F\u4E0A\u624B" aria-hidden="true">#</a> \u5FEB\u901F\u4E0A\u624B</h1><a class="npm-badge" href="http://npmjs.com/package/@zhengxs/axios-http" title="@zhengxs/axios-http" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/v/@zhengxs/axios-http/latest?label=@zhengxs/axios-http" alt="@zhengxs/axios-http@latest"></a><h2 id="\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a> \u5B89\u88C5</h2><p>\u5728\u547D\u4EE4\u884C\u4E2D\u8F93\u5165\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4:</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># With NPM</span>
$ <span class="token function">npm</span> <span class="token function">install</span> @zhengxs/axios-http --save

<span class="token comment"># With Yarn</span>
$ <span class="token function">yarn</span> <span class="token function">add</span> @zhengxs/axios-http

<span class="token comment"># With PNPM</span>
$ <span class="token function">pnpm</span> <span class="token function">add</span> @zhengxs/axios-http
</code></pre></div><h2 id="\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528" aria-hidden="true">#</a> \u4F7F\u7528</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineClient <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@zhengxs/axios-http&#39;</span>

<span class="token keyword">const</span> http <span class="token operator">=</span> <span class="token function">defineClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// \u8BBE\u7F6E\u57FA\u7840\u5730\u5740</span>
http<span class="token punctuation">.</span><span class="token function">setBaseURL</span><span class="token punctuation">(</span><span class="token string">&#39;https://example.com&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// \u8BBE\u7F6E\u81EA\u5B9A\u4E49\u8BF7\u6C42\u5934</span>
http<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&#39;x-api-version&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;v1&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// \u8BBE\u7F6E Authorization \u5934</span>
<span class="token comment">// \u9ED8\u8BA4\u4E3A Bearer \u7C7B\u578B</span>
http<span class="token punctuation">.</span><span class="token function">setToken</span><span class="token punctuation">(</span><span class="token string">&#39;xxx&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// \u542F\u7528 JSONP \u529F\u80FD</span>
http<span class="token punctuation">.</span><span class="token function">enableJsonp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// \u542F\u7528\u81EA\u52A8\u91CD\u8BD5</span>
http<span class="token punctuation">.</span><span class="token function">enableAutoRetry</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// \u542F\u7528 URI \u7248\u672C\u63A7\u5236</span>
http<span class="token punctuation">.</span><span class="token function">enableVersioning</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// \u53D1\u9001\u8BF7\u6C42</span>
http<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token string">&#39;http://example.com/test&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// \u53D1\u9001 jsonp \u8BF7\u6C42</span>
http<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token string">&#39;http://example.com/test&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">jsonp</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// \u8BBE\u7F6E jsonp=true \u53EF\u4EE5\u5C06\u666E\u901A\u8BF7\u6C42\u53D8\u4E3A jsonp</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div>`,7);function t(e,c){return p}var r=s(a,[["render",t]]);export{r as default};
