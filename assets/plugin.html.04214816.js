import{c as n}from"./app.cd156c98.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},p=n(`<h1 id="\u63D2\u4EF6\u5F00\u53D1" tabindex="-1"><a class="header-anchor" href="#\u63D2\u4EF6\u5F00\u53D1" aria-hidden="true">#</a> \u63D2\u4EF6\u5F00\u53D1</h1><p>\u5982\u679C\u4E00\u4E2A\u529F\u80FD\u6CA1\u6709\u7B2C\u4E09\u65B9\u4F9D\u8D56\uFF0C\u6216\u666E\u901A\u8BF7\u6C42\u4E0D\u9700\u8981\uFF0C\u6211\u4EEC\u90FD\u63A8\u8350\u4F18\u5148\u8003\u8651\u51FD\u6570\uFF0C\u800C\u4E0D\u662F\u63D2\u4EF6\u3002</p><p>\u5F00\u53D1\u4E00\u4E2A\u63D2\u4EF6\u7684\u7EA6\u5B9A:</p><ul><li>\u5982\u679C\u9700\u8981\u6DFB\u52A0\u62E6\u622A\u5668\uFF0C\u5E94\u8BE5\u4F7F\u7528\u524D\u7F6E\u6761\u4EF6\u9650\u5236\uFF0C\u5E76\u4E14\u652F\u6301 <code>AxiosRequestConfig</code> \u542F\u7528\u548C\u7981\u7528</li><li>\u5982\u679C\u62D3\u5C55\u7684\u662F Headers\uFF0C\u5E94\u8BE5\u8BBE\u7F6E\u5230 <code>AxiosInstance.defaults.headers.common</code></li><li>\u5982\u679C\u5199\u7684\u662F\u9002\u914D\u5668\uFF0C\u5E94\u8BE5\u901A\u8FC7\u62E6\u622A\u5668\u5C01\u4E00\u5C42</li></ul><h2 id="\u5F00\u53D1\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u5F00\u53D1\u63D2\u4EF6" aria-hidden="true">#</a> \u5F00\u53D1\u63D2\u4EF6</h2><p>\u63D2\u4EF6\u5E94\u8BE5\u66B4\u9732\u4E00\u4E2A install \u65B9\u6CD5\u3002\u8FD9\u4E2A\u65B9\u6CD5\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F Axios \u5B9E\u4F8B\uFF0C\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u53EF\u9009\u7684\u9009\u9879\u5BF9\u8C61\uFF1A</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> AxiosInstance <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">MyPluginOptions</span> <span class="token punctuation">{</span>
  <span class="token comment">// pass</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">install</span><span class="token punctuation">(</span>client<span class="token operator">:</span> AxiosInstance<span class="token punctuation">,</span> options<span class="token operator">:</span> MyPluginOptions <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1. \u62D3\u5C55\u5168\u5C40\u914D\u7F6E</span>
    client<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>enableMyPlugin <span class="token operator">=</span> <span class="token boolean">true</span>

    <span class="token comment">// 2. \u6DFB\u52A0\u5168\u5C40\u62E6\u622A\u5668</span>
    client<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u53EA\u6709\u542F\u7528\u624D\u80FD\u4FEE\u6539\u914D\u7F6E</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>enableMyPlugin<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6CE8\u610F\u4FEE\u6539 common \u4F5C\u7528\u57DF</span>
        config<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>common<span class="token punctuation">[</span><span class="token string">&#39;xxx&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;xxx&#39;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">return</span> config
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u62D3\u5C55 Axios \u7684\u8BF7\u6C42\u914D\u7F6E</span>
<span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">&#39;axios&#39;</span> <span class="token punctuation">{</span>
  <span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">AxiosRequestConfig</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u6DFB\u52A0\u914D\u7F6E</span>
    enableMyPlugin<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>\u4E5F\u652F\u6301\u76F4\u63A5\u5BFC\u51FA\u4E00\u4E2A\u51FD\u6570</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> AxiosInstance <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">MyPluginOptions</span> <span class="token punctuation">{</span>
  <span class="token comment">// pass</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span>  <span class="token keyword">function</span> <span class="token function">install</span><span class="token punctuation">(</span>client<span class="token operator">:</span> AxiosInstance<span class="token punctuation">,</span> options<span class="token operator">:</span> MyPluginOptions <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 1. \u62D3\u5C55\u5168\u5C40\u914D\u7F6E</span>
  client<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>enableMyPlugin <span class="token operator">=</span> <span class="token boolean">true</span>

  <span class="token comment">// 2. \u6DFB\u52A0\u5168\u5C40\u62E6\u622A\u5668</span>
  client<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u53EA\u6709\u542F\u7528\u624D\u80FD\u4FEE\u6539\u914D\u7F6E</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>enableMyPlugin<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u6CE8\u610F\u4FEE\u6539 common \u4F5C\u7528\u57DF</span>
      config<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>common<span class="token punctuation">[</span><span class="token string">&#39;xxx&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;xxx&#39;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> config
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u62D3\u5C55 Axios \u7684\u8BF7\u6C42\u914D\u7F6E</span>
<span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">&#39;axios&#39;</span> <span class="token punctuation">{</span>
  <span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">AxiosRequestConfig</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u6DFB\u52A0\u914D\u7F6E</span>
    enableMyPlugin<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>\u4F7F\u7528\u63D2\u4EF6</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> http <span class="token keyword">from</span> <span class="token string">&#39;@zhengxs/axios-http&#39;</span>
<span class="token keyword">import</span> MyPlugin <span class="token keyword">from</span> <span class="token string">&#39;my-plugin&#39;</span>

http<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>MyPlugin<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,11);function e(t,o){return p}var r=s(a,[["render",e]]);export{r as default};
